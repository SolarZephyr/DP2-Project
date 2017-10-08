var db = require('../dbconnection'); //reference of dbconnection.js  
var PredictedSales = {  
    getPredictedSalesForItems: function(callback) {  
			return db.query("CALL `mydb`.`getPredictedSalesForItems`()", function(err, result, fields)
			{
				result = result[0];
				var quresult = "[";
				var prevDate = new Date("1/9/2017");
				prevDate.setDate(prevDate.getDate() - 1);
				var currentID = result[0].ID;
				var startIndex = 0;
				var xmean = 0.0;
				var ymean = 0.0;
				var counter = 0;
				
				var top = 0.0;
				var bottom = 0.0;
				
				for(j = 0; j < result.length; j++)
				{
					if(currentID != result[j].ID)
					{
						xmean = (counter*(counter+1))/2;
						ymean = ymean / (counter);
						xmean = xmean / (counter); 
						
						prevDate = new Date("1/9/2017");
						prevDate.setDate(prevDate.getDate() - 1);
						var count = 1;
						for(i = startIndex; i < j; i++)
						{
							
							prevDate.setDate(prevDate.getDate() + 1);
							if(result[i].Date.getDate() != prevDate.getDate())
							{
								prevDate.setDate(prevDate.getDate() - 1);
								do
								{
									prevDate.setDate(prevDate.getDate() + 1);
									top += ((count-xmean)*(0-ymean));
									bottom += ((count-xmean)*(count-xmean));
									count++;
								}
								while((result[i].Date.getDate()-1) > prevDate.getDate());
							}
							else
							{
								top += ((count-xmean)*(result[i].Cnt-ymean));
								bottom += ((count-xmean)*(count-xmean));
								count++;
							}
						}
						var date1 = result[startIndex].Date;
						var date2 = result[j-1].Date;
						var timeDiff = Math.abs(date2.getTime() - date1.getTime());
						var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; 
						
						var gradient = top/bottom;
						
						var yinter = ymean - (gradient*xmean);
						
						var expected = yinter + (diffDays*gradient);
						var daySale = 0.0;
						for(i = 0; i < 30; i++)
						{
							daySale = yinter + (i*gradient);
							if(daySale < 0)
							{
								break;
							}
							expected += daySale;
						}

						quresult += "{\"ID\": \"" + result[j-1].ID + "\", \"Name\": \"" + result[j-1].Name + "\", \"Type\": \"" + result[j-1].Type + "\", \"Price\": \"" + result[j-1].Price + "\", \"Stock\": \"" + result[j-1].Stock + "\", \"Expected\": \"" + Math.ceil(expected) + "\"},";
						//debug
						//quresult += "--------------------------counter: " + counter + ", ymean: " + ymean + ", xmean: " + xmean + ", top: " + top + ", bottom: " + bottom + ", yinter: " + yinter + ", diffDate: " + diffDays + ", expected: " + Math.ceil(expected)+ "-----------------------"; 
					
						xmean = 0.0;
						ymean = result[j].Cnt;
						top = 0.0;
						bottom = 0.0;
						counter = 1;
						startIndex = j;
						currentID = result[j].ID;
						prevDate = new Date("1/9/2017");
						prevDate.setDate(prevDate.getDate() - 1);
					}
					else
					{	
						prevDate.setDate(prevDate.getDate() + 1);
						if(result[j].Date.getDate() != prevDate.getDate())
						{
							prevDate.setDate(prevDate.getDate() - 1);
							
							do
							{
								prevDate.setDate(prevDate.getDate() + 1);
								counter++;
							}
							while(result[j].Date.getDate() > prevDate.getDate());
							
							ymean += result[j].Cnt;
						}
						else
						{	
							counter++;
							ymean += result[j].Cnt;
							prevDate = result[j].Date;
						}
					}
				}
				xmean = (counter*(counter+1))/2;
				ymean = ymean / (counter);
				xmean = xmean / (counter); 
				
				prevDate = new Date("1/9/2017");
				prevDate.setDate(prevDate.getDate() - 1);
				var count = 1;
				for(i = startIndex; i < result.length; i++)
				{			
					prevDate.setDate(prevDate.getDate() + 1);
					if(result[i].Date.getDate() != prevDate.getDate())
					{
						prevDate.setDate(prevDate.getDate() - 1);
						do
						{
							prevDate.setDate(prevDate.getDate() + 1);
							top += ((count-xmean)*(0-ymean));
							bottom += ((count-xmean)*(count-xmean));
							count++;
						}
						while((result[i].Date.getDate()-1) > prevDate.getDate());
					}
					else
					{
						top += ((count-xmean)*(result[i].Cnt-ymean));
						bottom += ((count-xmean)*(count-xmean));
						count++;
					}
				}
				var date1 = result[startIndex].Date;
				var date2 = result[result.length-1].Date;
				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; 
						
				var gradient = top/bottom;
						
				var yinter = ymean - (gradient*xmean);
						
				var expected = yinter + (diffDays*gradient);
				var daySale = 0.0;
				for(i = 0; i < 30; i++)
				{
					daySale = yinter + (i*gradient);
					if(daySale < 0)
					{
						break;
					}
					expected += daySale;
				}
			
				
				quresult += "{\"ID\": \"" + result[result.length-1].ID + "\", \"Name\": \"" + result[result.length-1].Name + "\", \"Type\": \"" + result[result.length-1].Type + "\", \"Price\": \"" + result[result.length-1].Price + "\", \"Stock\": \"" + result[result.length-1].Stock + "\", \"Expected\": \"" +  Math.ceil(expected) + "\"}]";
				callback(quresult);	
			});
		},
		getPredictedSalesForType: function(type, callback) {  
			return db.query("SELECT Product.Type, Transaction.Date as Date, Count(Sale.ProductID) AS Cnt FROM ((Sale Inner Join Product ON Sale.ProductId = Product.ID) Inner Join Transaction ON Sale.TransactionID = Transaction.ID) GROUP BY Product.Type, Transaction.Date ORDER BY Product.Type, Transaction.Date", function(err, result, fields)
			{
				var quresult = "[";
				var prevDate = new Date("1/9/2017");
				prevDate.setDate(prevDate.getDate() - 1);
				var currentID = result[0].Type;
				var startIndex = 0;
				var xmean = 0.0;
				var ymean = 0.0;
				var counter = 0;
				
				var top = 0.0;
				var bottom = 0.0;
				
				for(j = 0; j < result.length; j++)
				{
					if(currentID != result[j].Type)
					{
						xmean = (counter*(counter+1))/2;
						ymean = ymean / (counter);
						xmean = xmean / (counter); 
						
						prevDate = new Date("1/9/2017");
						prevDate.setDate(prevDate.getDate() - 1);
						var count = 1;
						for(i = startIndex; i < j; i++)
						{
							
							prevDate.setDate(prevDate.getDate() + 1);
							if(result[i].Date.getDate() != prevDate.getDate())
							{
								prevDate.setDate(prevDate.getDate() - 1);
								do
								{
									prevDate.setDate(prevDate.getDate() + 1);
									top += ((count-xmean)*(0-ymean));
									bottom += ((count-xmean)*(count-xmean));
									count++;
								}
								while((result[i].Date.getDate()-1) > prevDate.getDate());
							}
							else
							{
								top += ((count-xmean)*(result[i].Cnt-ymean));
								bottom += ((count-xmean)*(count-xmean));
								count++;
							}
						}
						var date1 = result[startIndex].Date;
						var date2 = result[j-1].Date;
						var timeDiff = Math.abs(date2.getTime() - date1.getTime());
						var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; 
						
						var gradient = top/bottom;
						
						var yinter = ymean - (gradient*xmean);
						
						var expected = yinter + (diffDays*gradient);
						var daySale = 0.0;
						for(i = 0; i < 30; i++)
						{
							daySale = yinter + (i*gradient);
							if(daySale < 0)
							{
								break;
							}
							expected += daySale;
						}

						quresult += "{\"Type\": \"" + result[j-1].Type + "\", \"Expected\": \"" + Math.ceil(expected) + "\"},";
					
						xmean = 0.0;
						ymean = result[j].Cnt;
						top = 0.0;
						bottom = 0.0;
						counter = 1;
						startIndex = j;
						currentID = result[j].Type;
						prevDate = new Date("1/9/2017");
						prevDate.setDate(prevDate.getDate() - 1);
					}
					else
					{	
						prevDate.setDate(prevDate.getDate() + 1);
						if(result[j].Date.getDate() != prevDate.getDate())
						{
							prevDate.setDate(prevDate.getDate() - 1);
							
							do
							{
								prevDate.setDate(prevDate.getDate() + 1);
								counter++;
							}
							while(result[j].Date.getDate() > prevDate.getDate());
							
							ymean += result[j].Cnt;
						}
						else
						{	
							counter++;
							ymean += result[j].Cnt;
							prevDate = result[j].Date;
						}
					}
				}
				xmean = (counter*(counter+1))/2;
				ymean = ymean / (counter);
				xmean = xmean / (counter); 
				
				prevDate = new Date("1/9/2017");
				prevDate.setDate(prevDate.getDate() - 1);
				var count = 1;
				for(i = startIndex; i < result.length; i++)
				{			
					prevDate.setDate(prevDate.getDate() + 1);
					if(result[i].Date.getDate() != prevDate.getDate())
					{
						prevDate.setDate(prevDate.getDate() - 1);
						do
						{
							prevDate.setDate(prevDate.getDate() + 1);
							top += ((count-xmean)*(0-ymean));
							bottom += ((count-xmean)*(count-xmean));
							count++;
						}
						while((result[i].Date.getDate()-1) > prevDate.getDate());
					}
					else
					{
						top += ((count-xmean)*(result[i].Cnt-ymean));
						bottom += ((count-xmean)*(count-xmean));
						count++;
					}
				}
				var date1 = result[startIndex].Date;
				var date2 = result[result.length-1].Date;
				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; 
						
				var gradient = top/bottom;
						
				var yinter = ymean - (gradient*xmean);
						
				var expected = yinter + (diffDays*gradient);
				var daySale = 0.0;
				for(i = 0; i < 30; i++)
				{
					daySale = yinter + (i*gradient);
					if(daySale < 0)
					{
						break;
					}
					expected += daySale;
				}
			
				
				quresult += "{\"Type\": \"" + result[j-1].Type + "\", \"Expected\": \"" + Math.ceil(expected) + "\"}]";
				callback(quresult);
		});
	}
};  
module.exports = PredictedSales; 
var db = require('../dbconnection'); //reference of dbconnection.js  
var PredictedSales = {  
    getPredictedSalesForItems: function(callback) {  
			return db.query("CALL `mydb`.`getPredictedSalesForItems`()", function(err, result, fields)
			{
				result = result[0];
				var quresult = "[";
				var prevDate = result[0].Date;
				prevDate.setDate(result[0].Date.getDate() - 1);
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
					
						for(i = startIndex; i < j; i++)
						{
							top += ((i-xmean)*(result[i].Cnt-ymean));
							bottom += ((i-xmean)*(i-xmean));
						}
					
						quresult += "{\"ID\": \"" + result[j-1].ID + "\", \"Name\": \"" + result[j-1].Name + "\", \"Type\": \"" + result[j-1].Type + "\", \"Price\": \"" + result[j-1].Price + "\", \"Stock\": \"" + result[j-1].Stock + "\", \"Expected\": \"" + (top/bottom) + "\"},";
					
						xmean = 0.0;
						ymean = 0.0;
						counter = 0;
						startIndex = j;
						currentID = result[j].ID;
					}
					
					prevDate.setDate(prevDate.getDate() + 1);
					if(result[j].Date != prevDate)
					{
						do
						{
							prevDate.setDate(prevDate.getDate() + 1);
							counter++;
						}
						while(result[j].Date > prevDate);
						ymean += result[j].Cnt;
					}
					else
					{	
						counter++;
						ymean += result[j].Cnt;
					}
					prevDate = result[j].Date;
				}
				xmean = (counter*(counter+1))/2;
				ymean = ymean / (counter);
				xmean = xmean / (counter);
					
				for(i = startIndex; i < j; i++)
				{
					top += ((i-xmean)*(result[i].Cnt-ymean));
					bottom += ((i-xmean)*(i-xmean));
				}
				quresult += "{\"ID\": \"" + result[result.length-1].ID + "\", \"Name\": \"" + result[result.length-1].Name + "\", \"Type\": \"" + result[result.length-1].Type + "\", \"Price\": \"" + result[result.length-1].Price + "\", \"Stock\": \"" + result[result.length-1].Stock + "\", \"Expected\": \"" + (top/bottom) + "\"}]";
				callback(quresult);
		});
	}
};  
module.exports = PredictedSales; 
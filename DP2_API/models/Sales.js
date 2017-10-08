var db = require('../dbconnection'); //reference of dbconnection.js  
var Sales = {  
    getSaleById: function(id, callback) {  
		return db.query("SELECT sale.ID, product.Name, producttype.Description, sale.TransactionID, sale.Amt, sale.UnitPrice, sale.ProductID from SALE INNER JOIN PRODUCT on SALE.ProductID = PRODUCT.ID INNER JOIN producttype on product.Type = producttype.ID where transactionid=?", [id], callback);  
    },  
	getSalePredictionById: function(itemid, callback) {  
        return db.query("CALL `mydb`.`getSalePredictionById`(?)", [itemid], function(err, result, fields)
		{
			var xmean = 0.0;
			var ymean = 0.0;
			var prevDate = result[0].Date;
			prevDate.setDate(result[0].Date.getDate() - 1);
			var counter = 0;
			for(i = 0; i < result.length; i++)
			{
				prevDate.setDate(prevDate.getDate() + 1);
				if(result[i].Date != prevDate)
				{
					do
					{
						prevDate.setDate(prevDate.getDate() + 1);
						counter++;
					}
					while(result[i].Date > prevDate);
					ymean += result[i].Cnt;
				}
				else
				{	
					counter++;
					ymean += result[i].Cnt;
				}
				prevDate = result[i].Date;
			}
			xmean = (counter*(counter+1))/2;
			ymean = ymean / (counter);
			xmean = xmean / (counter);
			
			var top = 0.0;
			var bottom = 0.0;
			for(i = 0; i < result.length; i++)
			{
				top += ((i-xmean)*(result[i].Cnt-ymean));
				bottom += ((i-xmean)*(i-xmean));
			}
			//callback("mean: " + (top/bottom) + ", top: " + top + ", bottom: " + bottom + ", ymean: " + ymean + ", xmean: " + xmean);
			//callback("date: " + result[0].Date + ", debug: " + (result[0].Date > result[1].Date).toString() + ", debug2: " + (result[0].Date < result[1].Date).toString());
		});
    }, 
	getSalePredictionByType: function(groupid, callback) {  
        return db.query("CALL `mydb`.`getSalePredictionByType`(?)", [groupid], function(err, result, fields)
		{
			var xmean = 0.0;
			var ymean = 0.0;
			var prevDate = result[0].Date;
			prevDate.setDate(result[0].Date.getDate() - 1);
			var counter = 0;
			for(i = 0; i < result.length; i++)
			{
				prevDate.setDate(prevDate.getDate() + 1);
				if(result[i].Date != prevDate)
				{
					do
					{
						prevDate.setDate(prevDate.getDate() + 1);
						counter++;
					}
					while(result[i].Date > prevDate);
					ymean += result[i].Cnt;
				}
				else
				{	
					counter++;
					ymean += result[i].Cnt;
				}
				prevDate = result[i].Date;
			}
			xmean = (counter*(counter+1))/2;
			ymean = ymean / (counter);
			xmean = xmean / (counter);
			
			var top = 0.0;
			var bottom = 0.0;
			for(i = 0; i < result.length; i++)
			{
				top += ((i-xmean)*(result[i].Cnt-ymean));
				bottom += ((i-xmean)*(i-xmean));
			}
			//callback("mean: " + (top/bottom) + ", top: " + top + ", bottom: " + bottom + ", ymean: " + ymean + ", xmean: " + xmean);
			//callback("date: " + result[0].Date + ", debug: " + (result[0].Date > result[1].Date).toString() + ", debug2: " + (result[0].Date < result[1].Date).toString());
		});
    }, 
    addSale: function(Sale, callback) {  
        return db.query("CALL `mydb`.`addsale`(?,?,?,?)", [Sale.TransID, Sale.AmtSold, Sale.UnitPrice, Sale.ProdID], callback);  
	},
	genCSV: function(callback) {  
        return db.query("CALL `mydb`.`ToCSV`()", callback);  
	},
};  
module.exports = Sales; 
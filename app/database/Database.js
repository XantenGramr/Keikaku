'use strict';
import React from 'react';
import SQLite from 'react-native-sqlite-storage';
import SqlQueries from './SqlQueries';

var database_name = "DataDB.db";
var create_from_location = "~www/DataDB.db";
var location = "Library";

let conn;

class Database  {
	constructor(){
		console.log("TEST Construct");
	}

    executeSql = async (sql, params = []) => {
        return new Promise((resolve, reject) => {
            conn.transaction(
                tx => {
                    console.log(sql);
                    console.log(params);
                    tx.executeSql(
                        sql, params, 
                        (tx, results) => {
                            resolve(results);
                        },
                        (tx, err) => {
                            console.log(tx);
                            console.log(err);
                        }
                    );
                }
            );
        });
    }

    openDatabase = async () => {
		conn = await SQLite.openDatabase({
            name:"DataDB.db",
            createFromLocation: 1,
            location:'Library'},
            () => console.log("IOS - data db opened"),
            () => console.log("IOS - data db failed to open"),
        );
    }
    
    updateDatabase = async (version) => {
        SQLite.deleteDatabase({name:"DataDB.db", location: 'Library'},
                (res) => {
                    console.log(res);
                    console.log("CHECKPOINT")
                    conn = SQLite.openDatabase({
                        name:"DataDB.db",
                        createFromLocation: 1,
                        location:'Library'},
                        () => console.log("IOS - data db updated"),
                        () => console.log("IOS - data db failed to open"),
                    );
                }, (err)=> console.log("FAILED" + err)
            );
    }

    getVersion = async () => {
        var getSoftwareVersionQuery = SqlQueries.getSoftwareVersion();
        let results = await this.executeSql(getSoftwareVersionQuery, []);
        return results.rows.item(0).id;
    }

    getKanjiStates = async () => {
        var getKanjiStatesQuery = SqlQueries.getKanjiStates();
        let results = await this.executeSql(getKanjiStatesQuery, []);
        return results.rows;
    }

    updateKanjiState = async (day, status) => {
        var statusInInteger = status ? 1 : 0;
        var sqlQuery = SqlQueries.updateKanjiStates(day, statusInInteger);
        await this.executeSql(sqlQuery, []);
        return;
    }

    generateScheduledTable = async (tableName, count) => {
        var scheduledTableQueries = SqlQueries.generateScheduledTable(tableName, count);
        for (var i = 0; i < scheduledTableQueries.length; ++i)  {
          var query = scheduledTableQueries[i];
          await this.executeSql(query, []);
        }
    }

    generateCopyTableAndCountItems = async () => {
        var createCopyQueries = SqlQueries.createCopy();
        for (var i = 0; i < createCopyQueries.length; ++i) {
            var sqlQuery = createCopyQueries[i];
            await this.executeSql(sqlQuery, []);
        }

        var getElementsOfCopyQuery = SqlQueries.getElementsOfCopy();
        let results = await this.executeSql(getElementsOfCopyQuery, []);

        return results.rows.length;
    }

    getDailyCards = async (day) => {
        console.log("============== " + day);
        var getDailyCardsQuery = SqlQueries.getDailyCards(day);
        let results = await this.executeSql(getDailyCardsQuery, []);
        return results.rows;
    }

    getBatchOfCards = async (day) => {
        var getDailyCardsQuery = SqlQueries.getBatchOfCards(day);
        let results = await this.executeSql(getDailyCardsQuery, []);
        return results.rows;
    }

    updateCardState = async (day, key, status) => {
        var sqlQuery = SqlQueries.updateCardState(day, key, status);
        await this.executeSql(sqlQuery, []);
        return;
    }

    prepareWeekness = async () => {
        var sqlQueries = SqlQueries.prepareWeekness();
        for (var i = 0; i < sqlQueries.length; ++i)  {
          var query = sqlQueries[i];
          await this.executeSql(query, []);
        }
    }

    getConnection() {
        return conn;
    }
    print = async () => {
    	// console.log("TEST Value : " + total);
    }
}

module.exports = new Database();
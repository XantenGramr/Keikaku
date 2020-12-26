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
		console.log("Database.js Constructor");
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

    getStates = async () => {
        var getStatesQuery = SqlQueries.getStates();
        let results = await this.executeSql(getStatesQuery, []);
        return results.rows;
    }

    updateState = async (day, status) => {
        var statusInInteger = status ? 1 : 0;
        var sqlQuery = SqlQueries.updateStates(day, statusInInteger);
        await this.executeSql(sqlQuery, []);
        return;
    }

    generateScheduledTable = async (day, count, topic) => {
        var scheduledTableQueries = SqlQueries.generateScheduledTable(day, count, topic);
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

        var counts = [];
        var getElementsOfKanjiQuery = SqlQueries.getElementsOfKanji();
        let kanjiResults = await this.executeSql(getElementsOfKanjiQuery, []);
        counts.push(kanjiResults.rows.length);

        var getElementsOfVerbQuery = SqlQueries.getElementsOfVerb();
        let verbResults = await this.executeSql(getElementsOfVerbQuery, []);
        counts.push(verbResults.rows.length);

        var getElementsOfVocabQuery = SqlQueries.getElementsOfVocab();
        let vocabResults = await this.executeSql(getElementsOfVocabQuery, []);
        counts.push(vocabResults.rows.length);

        return counts;
    }

    getDailyCards = async (day, topic) => {
        if (day === 'Weekness') {
            var getWeeknessCardsQuery = SqlQueries.getWeeknessCards();
            let results = await this.executeSql(getWeeknessCardsQuery, []);
            return results.rows;
        } 
        var getDailyCardsQuery = SqlQueries.getDailyCards(day, topic);
        let results = await this.executeSql(getDailyCardsQuery, []);
        return results.rows;
    }

    getBatchOfCards = async (day, topic) => {
        if (day === 'Weekness') {
            var getWeeknessBatchOfCardsQuery = SqlQueries.getWeeknessBatchOfCards();
            let results = await this.executeSql(getWeeknessBatchOfCardsQuery, []);
            return results.rows;
        } 
        var getDailyCardsQuery = SqlQueries.getBatchOfCards(day, topic);
        let results = await this.executeSql(getDailyCardsQuery, []);

        return results.rows;
    }

    updateCardState = async (day, key, status, origin, topic) => {
        if (day === 'Weekness') {
            var sqlQuery = SqlQueries.updateCardState(origin, status, topic);
            await this.executeSql(sqlQuery, []);
            return;
        }

        var sqlQuery = SqlQueries.updateCardState(key, status, topic);
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
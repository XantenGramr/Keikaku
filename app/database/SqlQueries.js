const SqlQueries = {
    createCopy: function () {
        var queries = [];
        queries.push("DROP TABLE IF EXISTS copyOfTable;");
        queries.push("CREATE TABLE IF NOT EXISTS copyOfTable (id INTEGER PRIMARY KEY, english VARCHAR(255), kanji VARCHAR(255), hiragana VARCHAR(255));");
        queries.push("INSERT INTO copyOfTable(english, kanji, hiragana) SELECT English, Kanji, Hiragana FROM Characters;");
        return queries;
    },
    getElementsOfCopy: function () {
        var query = "SELECT * FROM copyOfTable;";
        return query;
    },
    generateScheduledTable: function(tableName, count) {
        var queries = [];
        var query = "";
        query = "DROP TABLE IF EXISTS " + tableName;
        queries.push(query);
        
        query = "CREATE TABLE IF NOT EXISTS ";
        query = query + tableName + " ";
        query = query + "(id INTEGER PRIMARY KEY, origin_id INTEGER , english VARCHAR(255), kanji VARCHAR(255), hiragana VARCHAR(255), status INTEGER DEFAULT 0";
        query = query + ", FOREIGN KEY (origin_id) REFERENCES copyOfTable(id));";
        queries.push(query);

        query = "INSERT INTO "
        query = query + tableName;
        query = query + "(origin_id, english, kanji, hiragana) SELECT id, english, kanji, hiragana FROM copyOfTable ORDER BY RANDOM() LIMIT ";
        query = query + count + ";";
        queries.push(query);

        query = "DELETE FROM copyOfTable WHERE EXISTS (";
        query = query + "SELECT * FROM " + tableName + " ";
        query = query + "WHERE " + tableName + ".origin_id = copyOfTable.id);";
        queries.push(query);

        return queries;
    },
    getKanjiStates: function () {
        var query = "SELECT * FROM KanjiStates;";
        return query;
    },
    updateKanjiStates: function(tableName, status) {
        var query = "UPDATE KanjiStates SET status = ";
        query = query + status + " ";
        query = query + "WHERE day = '" + tableName + "';";
        return query;
    },

    getSoftwareVersion: function() {
        var query = "SELECT * FROM SoftwareVersion;";
        return query;
    },

    updateSoftwareVersion: function(status) {
        var query = "UPDATE SoftwareVersion SET id = ";
        query = query + status + ";";
        return query;
    },
    getDailyCards: function (tableName) {
        var query = "SELECT * FROM ";
        query = query + tableName + ";";
        return query;
    },
    getBatchOfCards: function (tableName) {
        var query = "SELECT * FROM ";
        query = query + tableName + " WHERE status = 0 ";
        query = query + " LIMIT 20;";
        return query;
    },
    updateCardState: function(tableName, key, status) {
        var query = "UPDATE " + tableName + " SET status = " + status + " ";
        query = query + "WHERE id = " + key + ";";
        return query;
    },
}

export default SqlQueries;
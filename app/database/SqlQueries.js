const SqlQueries = {
    createCopy: function () {
        var queries = [];
        queries.push("DROP TABLE IF EXISTS copyOfKanjiCards;");
        queries.push("CREATE TABLE IF NOT EXISTS copyOfKanjiCards (id INTEGER PRIMARY KEY, front VARCHAR(255), back VARCHAR(255));");
        queries.push("INSERT INTO copyOfKanjiCards(front, back) SELECT front, back FROM KanjiCards;");

        queries.push("DROP TABLE IF EXISTS copyOfVerbCards;");
        queries.push("CREATE TABLE IF NOT EXISTS copyOfVerbCards (id INTEGER PRIMARY KEY, front VARCHAR(255), back VARCHAR(255));");
        queries.push("INSERT INTO copyOfVerbCards(front, back) SELECT front, back FROM VerbCards;");

        queries.push("DROP TABLE IF EXISTS copyOfVocabCards;");
        queries.push("CREATE TABLE IF NOT EXISTS copyOfVocabCards (id INTEGER PRIMARY KEY, front VARCHAR(255), back VARCHAR(255));");
        queries.push("INSERT INTO copyOfVocabCards(front, back) SELECT front, back FROM VocabCards;");

        queries.push("DROP TABLE IF EXISTS ScheduledTable;");
        queries.push("CREATE TABLE IF NOT EXISTS ScheduledTable (id INTEGER PRIMARY KEY, origin_id INTEGER, front VARCHAR(255), back VARCHAR(255), status INTEGER DEFAULT 0, day VARCHAR(255), topic VARCHAR(255));");
        return queries;
    },
    getElementsOfKanji: function () {
        var query = "SELECT * FROM copyOfKanjiCards;";
        return query;
    },
    getElementsOfVerb: function () {
        var query = "SELECT * FROM copyOfVerbCards;";
        return query;
    },
    getElementsOfVocab: function () {
        var query = "SELECT * FROM copyOfVocabCards;";
        return query;
    },
    generateScheduledTable: function(day, count, topic) {
        var queries = [];
        var query = "";

        query = "INSERT INTO ScheduledTable "
        query = query + "(origin_id, front, back, day, topic) SELECT id, front, back, '";
        query = query + day;
        query = query + "', '" + topic + "' FROM copyOf" + topic + "Cards ORDER BY RANDOM() LIMIT ";
        query = query + count + ";";
        queries.push(query);

        query = "DELETE FROM copyOf" + topic + "Cards WHERE EXISTS (";
        query = query + "SELECT * FROM ScheduledTable ";
        query = query + "WHERE ScheduledTable.origin_id = copyOf" + topic + "Cards.id AND ScheduledTable.day = '" + day + "' ";
        query = query + "AND topic = '" + topic + "');";
        queries.push(query);

        return queries;
    },
    getStates: function () {
        var query = "SELECT * FROM States;";
        return query;
    },
    updateStates: function(tableName, status) {
        var query = "UPDATE States SET status = ";
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
    getDailyCards: function (day, topic) {
        var query = "SELECT * FROM ScheduledTable ";
        query = query + "WHERE day = '" + day + "' AND topic = '" + topic + "';";
        return query;
    },
    getWeeknessCards: function () {
        var query = "SELECT * FROM Weekness;";
        return query;
    },
    getBatchOfCards: function (day, topic) {
        var query = "SELECT * FROM ScheduledTable ";
        query = query + "WHERE day = '" + day + "' AND status = 0 AND topic = '" + topic + "' ORDER BY RANDOM() LIMIT 20;";
        return query;
    },
    getWeeknessBatchOfCards: function () {
        var query = "SELECT * FROM Weekness ORDER BY RANDOM() LIMIT 20;";
        return query;
    },
    updateCardState: function(key, status, topic) {
        var query = "UPDATE ScheduledTable SET status = " + status + " ";
        query = query + "WHERE id = " + key + " AND topic = '" + topic + "';";
        return query;
    },
    prepareWeekness: function() {
        var queries = [];
        queries.push("DROP TABLE IF EXISTS Weekness;");
        queries.push("CREATE TABLE IF NOT EXISTS Weekness (id INTEGER PRIMARY KEY, origin_id INTEGER, front VARCHAR(255), back VARCHAR(255), status INTEGER DEFAULT 0);");
        queries.push("INSERT INTO Weekness(origin_id, front, back) SELECT id, front, back FROM ScheduledTable WHERE status = 2;");
        return queries;
    },
}

export default SqlQueries;
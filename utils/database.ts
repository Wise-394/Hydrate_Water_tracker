import { SQLiteDatabase } from 'expo-sqlite';
type CountResult = {
  count: number;
};

export const initDB = async (db: SQLiteDatabase) => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS waterLogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        date DATETIME
      );
    `);
  };
  
export const addWaterLog = async (db: SQLiteDatabase, date: Date) => {
  const isoDate = date.toISOString();
  await db.runAsync("INSERT INTO waterLogs (date) VALUES (?);", [isoDate]);
};


export const getAllWaterLogs = async (db: SQLiteDatabase) => {
  const result = await db.getAllAsync("SELECT * FROM waterLogs ORDER BY date DESC;");
  return result;
};

export const getTodayWaterLogs = async (db: SQLiteDatabase): Promise<number> => {
  const now = new Date();

  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const startISO = startOfDay.toISOString();
  const endISO = endOfDay.toISOString();   

  const result = await db.getAllAsync<CountResult>(
    "SELECT COUNT(*) as count FROM waterLogs WHERE datetime(date) >= datetime(?) AND datetime(date) <= datetime(?)",
    [startISO, endISO]
  );

  return result[0]?.count ?? 0;
};

export const getWaterLogById = async (db: SQLiteDatabase, id: number) => {
  const result = await db.getFirstAsync("SELECT * FROM waterLogs WHERE id = ?;", [id]);
  return result; 
};

export const getWeeklyWaterLogs = async (db: SQLiteDatabase): Promise<number> => {
  const result = await db.getAllAsync<CountResult>(
    `SELECT COUNT(*) as count 
     FROM waterLogs 
     WHERE date(date) BETWEEN date('now', 'weekday 0', '-6 days') AND date('now')`
  );

  return result[0]?.count ?? 0;
};

export const getWaterLogsLast7Days = async (
  db: SQLiteDatabase
): Promise<{ date: string; count: number }[]> => {
  const result = await db.getAllAsync<{ date: string; count: number }>(
    `SELECT 
        DATE(datetime(date)) as date, 
        COUNT(*) as count
     FROM waterLogs
     WHERE datetime(date) >= datetime('now', '-6 days') 
       AND datetime(date) <= datetime('now', 'localtime')
     GROUP BY DATE(datetime(date))
     ORDER BY DATE(datetime(date))`
  );
  return result ?? [];
};


export const updateWaterLog = async (db: SQLiteDatabase, id: number, newDate: string) => {
  await db.runAsync("UPDATE waterLogs SET date = ? WHERE id = ?;", [newDate, id]);
};

export const deleteWaterLog = async (db: SQLiteDatabase, id: number) => {
  await db.runAsync("DELETE FROM waterLogs WHERE id = ?;", [id]);
};
export const reset = async (db: SQLiteDatabase,) => {
  await db.runAsync("DELETE FROM waterLogs");
};

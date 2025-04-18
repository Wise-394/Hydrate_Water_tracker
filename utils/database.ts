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
  const today = new Date().toISOString().split('T')[0];
  const result = await db.getAllAsync<CountResult>(
    "SELECT COUNT(*) as count FROM waterLogs WHERE date(date) = date(?)", 
    [today]
  );
  return result[0]?.count ?? 0;  
};

export const getWaterLogById = async (db: SQLiteDatabase, id: number) => {
  const result = await db.getFirstAsync("SELECT * FROM waterLogs WHERE id = ?;", [id]);
  return result; 
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

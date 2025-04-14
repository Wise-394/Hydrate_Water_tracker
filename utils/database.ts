import { SQLiteDatabase } from 'expo-sqlite';

export const initDB = async (db: SQLiteDatabase) => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS waterLogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        date DATETIME
      );
    `);
  };
  
export const addWaterLog = async (db: SQLiteDatabase, date: string) => {
  await db.runAsync("INSERT INTO waterLogs (date) VALUES (?);", [date]);
};


export const getAllWaterLogs = async (db: SQLiteDatabase) => {
  const result = await db.getAllAsync("SELECT * FROM waterLogs ORDER BY date DESC;");
  return result;
};

export const getWaterLogById = async (db: SQLiteDatabase, id: number) => {
  const result = await db.getFirstAsync("SELECT * FROM waterLogs WHERE id = ?;", [id]);
  return result; 
};


export const updateWaterLog = async (db: SQLiteDatabase, id: number, newDate: string) => {
  await db.runAsync("UPDATE waterLogs SET date = ? WHERE id = ?;", [newDate, id]);
};

// ✅ Delete
export const deleteWaterLog = async (db: SQLiteDatabase, id: number) => {
  await db.runAsync("DELETE FROM waterLogs WHERE id = ?;", [id]);
};
export const reset = async (db: SQLiteDatabase,) => {
  await db.runAsync("DELETE FROM waterLogs");
};

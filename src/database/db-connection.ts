import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { SQLITE_PATH } from '../config.ts';
const { Database } = sqlite3;

fs.mkdirSync(path.dirname(SQLITE_PATH), { recursive: true });

const db = new Database(SQLITE_PATH, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('DB connected');
});

export const sqliteRun = (sql:string, params?: unknown[]):Promise<unknown> =>{
    return new Promise((resolve, reject) =>{
        db.run(sql, params, (error:unknown, data:unknown) =>{
            if(error){
                return reject(error)
            }

            resolve(data)
        })
    })
}

export const sqliteGet = (sql:string, params?: unknown[]):Promise<unknown> =>{
    return new Promise((resolve, reject) =>{
        db.get(sql, params, (error:unknown, data:unknown) =>{
            if(error){
                return reject(error)
            }

            resolve(data)
        })
    })
}

export const sqliteAll = (sql:string, params?: unknown[]):Promise<unknown> =>{
    return new Promise((resolve, reject) =>{
        db.all(sql, params, (error:unknown, data:unknown) =>{
            if(error){
                return reject(error)
            }

            resolve(data)
        })
    })
}
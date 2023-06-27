import { json } from '@sveltejs/kit';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3'

export async function GET() {

    // the 'sqlite' library is a wrapper over sqlite3 to provide async/promise API
    const db = await open({
        filename: 'dailies.sqlite',
        driver: sqlite3.Database
    });

    const result = await db.all('SELECT * FROM Entries');
    await db.close();

    return json(result);
}


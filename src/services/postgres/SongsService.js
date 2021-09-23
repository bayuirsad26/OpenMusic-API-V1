const {Pool} = require('pg');
const {nanoid} = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const {mapDBToModel} = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');

// class constructor allows missing @returns tag
/**
 * Represents a pool technique.
 */
class SongsService {
  /**
   * The constructor not using param.
   */
  constructor() {
    this._pool = new Pool();
  }

  /**
   * Add song into database.
   * @param {*} param0 The group of params.
   * @return {*} The result of array id.
   */
  async addSong({
    title,
    year,
    performer,
    genre,
    duration,
  }) {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [id,
        title,
        year,
        performer,
        genre,
        duration,
        insertedAt,
        updatedAt],
    };
    const result = await this._pool.query(query);
    console.log(query.values);

    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  /**
   * Get all songs from database.
   * @return {*} The result of rows.
   */
  async getSongs() {
    const result = await this._pool.query('SELECT id, title, performer FROM songs');
    return result.rows;
  }

  /**
   * Get song by id from database.
   * @param {*} id The id number.
   * @return {*} The result of rows map.
   */
  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return result.rows.map(mapDBToModel)[0];
  }

  /**
   * Edit song by id from database.
   * @param {*} id The id number.
   * @param {*} param1 The group of params.
   */
  async editSongById(id, {
    title,
    year,
    performer,
    genre,
    duration,
  }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, updated_at = $6 WHERE id = $7 RETURNING id',
      values: [title,
        year,
        performer,
        genre,
        duration,
        updatedAt,
        id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
    }
  }

  /**
   * Delete song by id from database.
   * @param {*} id The id number.
   */
  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = SongsService;

const ClientError = require('../../exceptions/ClientError');

// class constructor allows missing @returns tag
/**
 * Represents handler of function songs API.
 */
class SongsHandler {
  /**
   * Represents this into instance of NotesService not in Objecy routes.
   * @param {*} service The property of SongsHandler.
   * @param {*} validator The property of SongsHandler.
   */
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  /**
   * Post song handler.
   * @param {*} request The request param.
   * @param {*} h  The response useness.
   * @return {*} The return of response value.
   */
  async postSongHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const {
        title,
        year,
        performer,
        genre,
        duration,
      } = request.payload;

      const songId = await this._service.addSong({
        title,
        year,
        performer,
        genre,
        duration,
      });

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: {
          songId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  /**
   * Get all songs handler.
   * @return {*} The return of response value.
   */
  async getSongsHandler() {
    const songs = await this._service.getSongs();
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  /**
   * Get song by id handler.
   * @param {*} request The request param.
   * @param {*} h The response useness.
   * @return {*} The return response of message.
   */
  async getSongByIdHandler(request, h) {
    try {
      const {id} = request.params;
      const song = await this._service.getSongById(id);
      return {
        status: 'success',
        data: {
          song,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  /**
   * Put song by id handler.
   * @param {*} request The request param.
   * @param {*} h The response useness.
   * @return {*} The return response of message.
   */
  async putSongByIdHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const {id} = request.params;

      await this._service.editSongById(id, request.payload);

      return {
        status: 'success',
        message: 'Lagu berhasil diperbarui',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  /**
   * Delete song by id handler.
   * @param {*} request The request param.
   * @param {*} h The response useness.
   * @return {*} The return response of message.
   */
  async deleteSongByIdHandler(request, h) {
    try {
      const {id} = request.params;
      await this._service.deleteSongById(id);
      return {
        status: 'success',
        message: 'Lagu berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = SongsHandler;

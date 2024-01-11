import Axios from "axios";
import { EventEmitter } from "events";
import { ReviewCommentsHelper } from "../services/ReviewCommentsHelper";
import { ReviewUserHelper } from "../services/ReviewUserHelper";

export class RawgApi extends EventEmitter {
  constructor() {
    super();
    this.apiKey = process.env.REACT_APP_API_KEY;
    this.gameIds = []; // Store fetched game IDs
  }

  /**
   * Sends a GET request to the RAWG API.
   * @param {string} gameId - The ID of the specific game to fetch (optional).
   * @returns {Promise} - A promise that resolves to the API response data.
   */
  async sendGetRequest(gameId = "") {
    try {
      const response = await Axios.get(
        `https://api.rawg.io/api/games${gameId ? "/" + gameId : ""}?key=${
          this.apiKey
        }`
      );
      return response?.data.results;
    } catch (err) {
      console.error("RawgApi Error:", err);
      throw err;
    }
  }

  /**
   * Filters and transforms raw game data into a more structured format.
   * @param {Array} gameData - Raw game data from the API.
   * @returns {Array} - An array of transformed game objects.
   */
  filterGameData(gameData) {
    return gameData.map((game) => {
      return {
        id: game?.id,
        title: game?.name,
        description: game?.description,
        image: game?.background_image,
        esrbRating: game?.esrb_rating?.name,
        genres: game?.genres.map((genre) => genre.name),
        platforms: game?.platforms.map((platform) => platform.name),
        rating: game?.rating,
        ratings: game?.ratings,
        ratingsCount: game?.ratings_count,
        releaseDate: game?.released,
        reviewsCount: game?.reviews_count,
        stores: game?.stores.map((store) => store.name),
        tags: game?.tags,
        images: game?.short_screenshots.map((screenshot) => screenshot.image),
        status: game?.added_by_status,
      };
    });
  }

  /**
   * Fetches game data from the RAWG API and emits the "dataFetched" event.
   */
  async fetchData() {
    try {
      const gamesData = await this.sendGetRequest();
      const transformedData = this.filterGameData(gamesData);
      transformedData.forEach((game) => this.gameIds.push(game.id));
      this.emit("dataFetched", transformedData);
    } catch (err) {
      console.error("RawgApi Data Fetch Error:", err);
    }
  }

  /* || Review Data Handler */

  /**
   *
   * @param {String} requestUrl - URL for api request
   * @returns {Array} - filtered Review Array Unfiltered
   */
  async sendReviewRequest(requestUrl) {
    try {
      const response = await Axios.get(requestUrl);
      return response?.data.results;
    } catch (err) {
      console.error("RawgApi Send Review Request Error:", err);
    }
  }

  /**
   * Filters Data
   *
   * @param {Array} reviews - Contains Reviews of players from rawg.
   * @returns {Array} - Filtered array of objects with transformed data
   */
  filterReviews(reviews) {
    return reviews.map((review) => {
      return {
        id: review.id,
        comments_count: review.comments_count,
        comments: {
          count: review.comments?.count,
          results: ReviewCommentsHelper(review.comments),
        },
        created: review.created,
        edited: review.edited,
        external_author: review.external_author,
        external_avatar: review.external_avatar,
        gameId: review.gameId,
        likes_count: review.likes_count,
        likes_positive: review.likes_positive,
        likes_rating: review.likes_rating,
        rating: review.rating,
        reactions: review.reactions,
        share_image: review.share_image,
        text: review.text,
        user: ReviewUserHelper(review.user),
      };
    });
  }

  /**
   *
   * @param {String} gameId - id of game gta - 3498
   */
  async fetchReviews(gameId = "") {
    try {
      const reviews = await this.sendReviewRequest(
        `https://api.rawg.io/api/games/${gameId}/reviews?key=${this.apiKey}`
      );
      if (reviews) {
        const transformedData = this.filterReviews(reviews);
        //console.log("RawgApi Fetch Review ", reviews);

        return transformedData;
      }

      return {};
    } catch (err) {
      console.error("RawgApi Review Fetch Error:", err);
    }
  }
  /* || End Review Data Handler */
}

import got from "got";
import IOptions from "./interfaces/IOptions";
import IQuery from "./interfaces/IQuery";
import parser from "./modules/parser";
import Logger from "./modules/logger";
import QueryType from "./interfaces/EType";

function mutation (endPoint: string, query: IQuery, options: IOptions) : Promise<object> {
  try {
    const logger: Logger = new Logger(options); // Instantiate logger to log messages

    logger.log(`Parsing mutation: ${query}`);
    const graphQuery: string = parser.parse(query, QueryType.mutation);
    logger.log(`Parsed mutation: ${graphQuery}`);

    logger.log('Building options object');
    const httpOptions: object = {
      headers: options.headers,
      body: graphQuery,
      json: true
    }
    logger.log(`Option object: ${httpOptions}`);

    return got.post(endPoint, httpOptions);
  } catch (error) {
    throw error;
  }
};

export default mutation;
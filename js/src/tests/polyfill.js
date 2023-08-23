import { Headers, Response } from 'node-fetch';
import 'url-search-params-polyfill';
import { DOMParser } from '@xmldom/xmldom';

global.DOMParser = DOMParser;
global.Headers = Headers;
global.Response = Response;

require('formdata-polyfill');

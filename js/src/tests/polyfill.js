import { Blob } from 'blob-polyfill';
import { Headers, Response } from 'node-fetch';
import 'url-search-params-polyfill';
import { DOMParser } from '@xmldom/xmldom';

global.DOMParser = DOMParser;
global.Blob = Blob;
global.Headers = Headers;
global.Response = Response;

require('formdata-polyfill');

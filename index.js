//
// index.js
// @trenskow/app-express
//
// Created by Kristian Trenskow on 2020/12/26
// For license see LICENSE.
//

import { Transform } from 'stream';

import { bytes } from '@trenskow/units';

export default class Limiter extends Transform {

	constructor(limit, options = {}) {
		super();

		if (typeof limit === 'string') limit = bytes(limit);
		if (typeof limit !== 'number') throw new SyntaxError('Limit must be a number or string.');

		this._length = 0;

		this._limit = limit;
		this._options = options;

	}

	_transform(chunk, encoding, done) {

		this._length += typeof chunk === 'string' ? Buffer.from(chunk, encoding).length : chunk.length;

		if (this._length > this._limit) {
			done(this._options?.errorFactory() || new Error(`Stream reached its limit of ${this._limit} bytes.`));
		} else {
			done(null, chunk, encoding);
		}

	}

};

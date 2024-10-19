import { Transform } from 'stream';

export default class Limiter extends Transform {

	constructor(limit, options = {}) {
		super();

		if (typeof limit !== 'number') throw new SyntaxError('Limit must be a number.');

		this._length = 0;

		this._limit = limit;
		this._options = options;

	}

	_transform(chunk, encoding, done) {

		if (typeof chunk === 'string') this._length += Buffer.from(chunk, 'utf8');
		else this._length += chunk.length;

		if (this._length > this._limit) {
			done(this._options.errorGenerator ? this._options.errorGenerator() : new Error(`Stream reached its limit of ${this._limit} bytes.`));
		} else {
			this.push(chunk, encoding);
			done();
		}

	}

};

@trenskow/stream-limiter
----

A transform stream to limit the length of a stream.

# Usage

````javascript
const StreamLimiter = require('@trenskow/stream-limiter');

const myReadableStream = /* a readable stream */
const myWriteableStream = /* a writeable stream */

myReadableStream.pipe(new StreamLimiter(1000 /* (limit) */)).pipe(myWriteableStream)

````

# LICENSE

See LICENSE


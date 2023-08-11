class ArrayBufferIO_B {
	buffer: ArrayBuffer;
	offset: number;
	data_view: DataView;

	/** Construct a new ArrayBufferIO instance. */
	constructor(buffer: ArrayBuffer) {
		this.buffer = buffer;
		this.offset = 0;
		this.data_view = new DataView(this.buffer);
	}

	/** Allocate a new ArrayBuffer wrapped in an ArrayBufferIO instance. */
	static alloc(size: number): ArrayBufferIO_B {
		return new ArrayBufferIO_B(new ArrayBuffer(size));
	}

	/** The length of the buffer. */
	get length(): number {
		return this.buffer.byteLength;
	}

	/**
	 * Asserts that the offset is within the bounds of the buffer.
	 * @throws {RangeError} If the offset is out of bounds.
	 */
	range_check(offset: number): void {
		if (offset < 0 || offset > this.buffer.byteLength)
			throw new RangeError('Offset out of bounds: ' + offset + ' / ' + this.buffer.byteLength);
	}

	/**
	 * Implicitly set the offset of the buffer.
	 * @throws {RangeError} If the offset is out of bounds.
	 */
	set_offset(offset: number): void {
		this.range_check(offset);
		this.offset = offset;
	}

	/** Resets the buffer offset to zero. */
	reset(): void {
		this.offset = 0;
	}

	/**
	 * Moves the buffer offset backwards by the specified amount.
	 * @throws {RangeError} If the offset is out of bounds.
	 */
	rewind(offset: number): void {
		this.set_offset(this.offset - offset);
	}

	/**
	 * Moves the buffer offest forward by the specified amount.
	 * @throws {RangeError} If the offset is out of bounds.
	 */
	skip(offset: number): void {
		this.set_offset(this.offset + offset);
	}

	/** Reads a signed 8-bit integer from the buffer. */
	read_int8(): number {
		this.range_check(this.offset + 1);
		const value = this.data_view.getInt8(this.offset);
		this.offset += 1;
		return value;
	}
	
	/** Reads an unsigned 8-bit integer from the buffer. */
	read_uint8(): number {
		this.range_check(this.offset + 1);
		const value = this.data_view.getUint8(this.offset);
		this.offset += 1;
		return value;
	}

	/** Reads an unsigned 16-bit integer from the buffer. */
	read_uint16(): number {
		this.range_check(this.offset + 2);
		const value = this.data_view.getUint16(this.offset, true);
		this.offset += 2;
		return value;
	}

	/** Reads an unsigned 16-bit integer from the buffer in big endian format. */
	read_uint16_be(): number {
		this.range_check(this.offset + 2);
		const value = this.data_view.getUint16(this.offset, false);
		this.offset += 2;
		return value;
	}

	/** Reads a signed 16-bit integer from the buffer. */
	read_int16(): number {
		this.range_check(this.offset + 2);
		const value = this.data_view.getInt16(this.offset, true);
		this.offset += 2;
		return value;
	}

	/** Reads a signed 16-bit integer from the buffer in big endian format. */
	read_int16_be(): number {
		this.range_check(this.offset + 2);
		const value = this.data_view.getInt16(this.offset, false);
		this.offset += 2;
		return value;
	}

	/** Reads an unsigned 32-bit integer from the buffer. */
	read_uint32(): number {
		this.range_check(this.offset + 4);
		const value = this.data_view.getUint32(this.offset, true);
		this.offset += 4;
		return value;
	}

	/** Reads an unsigned 32-bit integer from the buffer in big endian format. */
	read_uint32_be(): number {
		this.range_check(this.offset + 4);
		const value = this.data_view.getUint32(this.offset, false);
		this.offset += 4;
		return value;
	}

	/** Reads a signed 32-bit integer from the buffer. */
	read_int32(): number {
		this.range_check(this.offset + 4);
		const value = this.data_view.getInt32(this.offset, true);
		this.offset += 4;
		return value;
	}

	/** Reads a signed 32-bit integer from the buffer in big endian format. */
	read_int32_be(): number {
		this.range_check(this.offset + 4);
		const value = this.data_view.getInt32(this.offset, false);
		this.offset += 4;
		return value;
	}

	/** Reads a signed 64-bit integer from the buffer. */
	read_int64(): bigint {
		this.range_check(this.offset + 8);
		const value = this.data_view.getBigInt64(this.offset, true);
		this.offset += 8;
		return value;
	}

	/** Reads a signed 64-bit integer from the buffer in big endian format. */
	read_int64_be(): bigint {
		this.range_check(this.offset + 8);
		const value = this.data_view.getBigInt64(this.offset, false);
		this.offset += 8;
		return value;
	}

	/** Reads an unsigned 64-bit integer from the buffer. */
	read_uint64(): bigint {
		this.range_check(this.offset + 8);
		const value = this.data_view.getBigUint64(this.offset, true);
		this.offset += 8;
		return value;
	}

	/** Reads an unsigned 64-bit integer from the buffer in big endian format. */
	read_uint64_be(): bigint {
		this.range_check(this.offset + 8);
		const value = this.data_view.getBigUint64(this.offset, false);
		this.offset += 8;
		return value;
	}

	/** Reads a 32-bit floating point number from the buffer. */
	read_float(): number {
		this.range_check(this.offset + 4);
		const value = this.data_view.getFloat32(this.offset, true);
		this.offset += 4;
		return value;
	}

	/** Reads a 32-bit floating point number from the buffer in big endian format. */
	read_float_be(): number {
		this.range_check(this.offset + 4);
		const value = this.data_view.getFloat32(this.offset, false);
		this.offset += 4;
		return value;
	}

	/** Reads a 64-bit floating point number from the buffer. */
	read_double(): number {
		this.range_check(this.offset + 8);
		const value = this.data_view.getFloat64(this.offset, true);
		this.offset += 8;
		return value;
	}

	/** Reads a 64-bit floating point number from the buffer in big endian format. */
	read_double_be(): number {
		this.range_check(this.offset + 8);
		const value = this.data_view.getFloat64(this.offset, false);
		this.offset += 8;
		return value;
	}

	/** Writes a signed 8-bit integer to the buffer. */
	write_int8(value: number): void {
		this.range_check(this.offset + 1);
		this.data_view.setInt8(this.offset, value);
		this.offset += 1;
	}

	/** Writes an unsigned 8-bit integer to the buffer. */
	write_uint8(value: number): void {
		this.range_check(this.offset + 1);
		this.data_view.setUint8(this.offset, value);
		this.offset += 1;
	}

	/** Writes a signed 16-bit integer to the buffer. */
	write_int16(value: number): void {
		this.range_check(this.offset + 2);
		this.data_view.setInt16(this.offset, value, true);
		this.offset += 2;
	}

	/** Writes a signed 16-bit integer to the buffer in big endian format. */
	write_int16_be(value: number): void {
		this.range_check(this.offset + 2);
		this.data_view.setInt16(this.offset, value, false);
		this.offset += 2;
	}

	/** Writes an unsigned 16-bit integer to the buffer. */
	write_uint16(value: number): void {
		this.range_check(this.offset + 2);
		this.data_view.setUint16(this.offset, value, true);
		this.offset += 2;
	}

	/** Writes an unsigned 16-bit integer to the buffer in big endian format. */
	write_uint16_be(value: number): void {
		this.range_check(this.offset + 2);
		this.data_view.setUint16(this.offset, value, false);
		this.offset += 2;
	}

	/** Writes a signed 32-bit integer to the buffer. */
	write_int32(value: number): void {
		this.range_check(this.offset + 4);
		this.data_view.setInt32(this.offset, value, true);
		this.offset += 4;
	}

	/** Writes a signed 32-bit integer to the buffer in big endian format. */
	write_int32_be(value: number): void {
		this.range_check(this.offset + 4);
		this.data_view.setInt32(this.offset, value, false);
		this.offset += 4;
	}

	/** Writes an unsigned 32-bit integer to the buffer. */
	write_uint32(value: number): void {
		this.range_check(this.offset + 4);
		this.data_view.setUint32(this.offset, value, true);
		this.offset += 4;
	}

	/** Writes an unsigned 32-bit integer to the buffer in big endian format. */
	write_uint32_be(value: number): void {
		this.range_check(this.offset + 4);
		this.data_view.setUint32(this.offset, value, false);
		this.offset += 4;
	}

	/** Writes a signed 64-bit integer to the buffer. */
	write_int64(value: bigint): void {
		this.range_check(this.offset + 8);
		this.data_view.setBigInt64(this.offset, value, true);
		this.offset += 8;
	}

	/** Writes a signed 64-bit integer to the buffer in big endian format. */
	write_int64_be(value: bigint): void {
		this.range_check(this.offset + 8);
		this.data_view.setBigInt64(this.offset, value, false);
		this.offset += 8;
	}

	/** Writes an unsigned 64-bit integer to the buffer. */
	write_uint64(value: bigint): void {
		this.range_check(this.offset + 8);
		this.data_view.setBigUint64(this.offset, value, true);
		this.offset += 8;
	}

	/** Writes an unsigned 64-bit integer to the buffer in big endian format. */
	write_uint64_be(value: bigint): void {
		this.range_check(this.offset + 8);
		this.data_view.setBigUint64(this.offset, value, false);
		this.offset += 8;
	}

	/** Writes a 32-bit floating point number to the buffer. */
	write_float(value: number): void {
		this.range_check(this.offset + 4);
		this.data_view.setFloat32(this.offset, value, true);
		this.offset += 4;
	}

	/** Writes a 32-bit floating point number to the buffer in big endian format. */
	write_float_be(value: number): void {
		this.range_check(this.offset + 4);
		this.data_view.setFloat32(this.offset, value, false);
		this.offset += 4;
	}

	/** Writes a 64-bit floating point number to the buffer. */
	write_double(value: number): void {
		this.range_check(this.offset + 8);
		this.data_view.setFloat64(this.offset, value, true);
		this.offset += 8;
	}

	/** Writes a 64-bit floating point number to the buffer in big endian format. */
	write_double_be(value: number): void {
		this.range_check(this.offset + 8);
		this.data_view.setFloat64(this.offset, value, false);
		this.offset += 8;
	}

	/** Read a string from the buffer. */
	read_string(length: number, encoding: Encoding = 'utf-8'): string {
		this.range_check(this.offset + length);

		const decoder = new TextDecoder(encoding);
		const slice = this.buffer.slice(this.offset, this.offset + length);
		const value = decoder.decode(slice);
		this.offset += length;
		return value;
	}

	/** Writes a string to the buffer. */
	write_string(string: string) {
		this.range_check(this.offset + string.length);

		const encoder = new TextEncoder();
		const bytes = encoder.encode(string);
		const length = bytes.length;

		for (let i = 0; i < length; i++)
			this.data_view.setUint8(this.offset + i, bytes[i]);

		this.offset += length;
	}
}
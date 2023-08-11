import ArrayBufferIO from './index';
import { expect, test } from 'bun:test';

test('ArrayBufferIO.constructor', () => {
	const array_buffer = new ArrayBuffer(10);
	const array_buffer_io = new ArrayBufferIO(array_buffer);

	expect(array_buffer_io).toBeInstanceOf(ArrayBufferIO);
	expect(array_buffer_io).toHaveProperty('buffer', array_buffer);
	expect(array_buffer_io).toHaveProperty('offset', 0);
	expect(array_buffer_io).toHaveProperty('data_view');

	expect(array_buffer_io.data_view).toBeInstanceOf(DataView);
	expect(array_buffer_io.data_view).toHaveProperty('buffer', array_buffer);
});

test('ArrayBufferIO.alloc', () => {
	const array_buffer = ArrayBufferIO.alloc(10);

	expect(array_buffer).toBeInstanceOf(ArrayBufferIO);
	expect(array_buffer).toHaveProperty('buffer');
	expect(array_buffer.length).toBe(10);
	expect(array_buffer.buffer.byteLength).toBe(10);
	expect(array_buffer.offset).toBe(0);

	const data_view = new DataView(array_buffer.buffer);
	for (let i = 0; i < array_buffer.length; i++)
		expect(data_view.getUint8(i)).toBe(0);
});

test('ArrayBufferIO.set_offer', () => {
	const array_buffer = ArrayBufferIO.alloc(10);
	expect(array_buffer.offset).toBe(0);

	array_buffer.set_offset(5);
	expect(array_buffer.offset).toBe(5);

	array_buffer.set_offset(0);
	expect(array_buffer.offset).toBe(0);

	expect(() => array_buffer.set_offset(-1)).toThrow(RangeError);
	expect(() => array_buffer.set_offset(11)).toThrow(RangeError);
});

test('ArrayBufferIO.reset', () => {
	const array_buffer = ArrayBufferIO.alloc(10);
	array_buffer.set_offset(5);
	expect(array_buffer.offset).toBe(5);

	array_buffer.reset();
	expect(array_buffer.offset).toBe(0);
});

test('ArrayBufferIO.skip', () => {
	const array_buffer = ArrayBufferIO.alloc(10);
	expect(array_buffer.offset).toBe(0);

	array_buffer.skip(5);
	expect(array_buffer.offset).toBe(5);

	array_buffer.skip(5);
	expect(array_buffer.offset).toBe(10);

	expect(() => array_buffer.skip(1)).toThrow(RangeError);
});

test('ArrayBufferIO.rewind', () => {
	const array_buffer = ArrayBufferIO.alloc(10);
	array_buffer.set_offset(5);
	expect(array_buffer.offset).toBe(5);

	array_buffer.rewind(5);
	expect(array_buffer.offset).toBe(0);

	array_buffer.rewind(0);
	expect(array_buffer.offset).toBe(0);

	expect(() => array_buffer.rewind(1)).toThrow(RangeError);
});

test('ArrayBufferIO.read_int8', () => {
	const array_buffer = ArrayBufferIO.alloc(4);
	array_buffer.data_view.setInt8(0, 127);
	array_buffer.data_view.setInt8(1, -128);
	array_buffer.data_view.setInt8(2, 0);
	array_buffer.data_view.setInt8(3, -1);

	expect(array_buffer.read_int8()).toBe(127);
	expect(array_buffer.read_int8()).toBe(-128);
	expect(array_buffer.read_int8()).toBe(0);
	expect(array_buffer.read_int8()).toBe(-1);
});

test('ArrayBufferIO.read_uint8', () => {
	const array_buffer = ArrayBufferIO.alloc(4);
	array_buffer.data_view.setUint8(0, 255);
	array_buffer.data_view.setUint8(1, 0);
	array_buffer.data_view.setUint8(2, 127);
	array_buffer.data_view.setUint8(3, 128);

	expect(array_buffer.read_uint8()).toBe(255);
	expect(array_buffer.read_uint8()).toBe(0);
	expect(array_buffer.read_uint8()).toBe(127);
	expect(array_buffer.read_uint8()).toBe(128);
});

test('ArrayBufferIO.read_int16_le', () => {
	const array_buffer = ArrayBufferIO.alloc(4);
	array_buffer.data_view.setInt16(0, 32767, true);
	array_buffer.data_view.setInt16(2, -32768, true);

	expect(array_buffer.read_int16()).toBe(32767);
	expect(array_buffer.read_int16()).toBe(-32768);
});

test('ArrayBufferIO.read_int16_be', () => {
	const array_buffer = ArrayBufferIO.alloc(4);
	array_buffer.data_view.setInt16(0, 32767, false);
	array_buffer.data_view.setInt16(2, -32768, false);

	expect(array_buffer.read_int16_be()).toBe(32767);
	expect(array_buffer.read_int16_be()).toBe(-32768);
});

test('ArrayBufferIO.read_uint16_le', () => {
	const array_buffer = ArrayBufferIO.alloc(4);
	array_buffer.data_view.setUint16(0, 65535, true);
	array_buffer.data_view.setUint16(2, 0, true);

	expect(array_buffer.read_uint16()).toBe(65535);
	expect(array_buffer.read_uint16()).toBe(0);
});

test('ArrayBufferIO.read_uint16_be', () => {
	const array_buffer = ArrayBufferIO.alloc(4);
	array_buffer.data_view.setUint16(0, 65535, false);
	array_buffer.data_view.setUint16(2, 0, false);

	expect(array_buffer.read_uint16_be()).toBe(65535);
	expect(array_buffer.read_uint16_be()).toBe(0);
});

test('ArrayBufferIO.read_int32_le', () => {
	const array_buffer = ArrayBufferIO.alloc(8);
	array_buffer.data_view.setInt32(0, 2147483647, true);
	array_buffer.data_view.setInt32(4, -2147483648, true);

	expect(array_buffer.read_int32()).toBe(2147483647);
	expect(array_buffer.read_int32()).toBe(-2147483648);
});

test('ArrayBufferIO.read_int32_be', () => {
	const array_buffer = ArrayBufferIO.alloc(8);
	array_buffer.data_view.setInt32(0, 2147483647, false);
	array_buffer.data_view.setInt32(4, -2147483648, false);

	expect(array_buffer.read_int32_be()).toBe(2147483647);
	expect(array_buffer.read_int32_be()).toBe(-2147483648);
});

test('ArrayBufferIO.read_uint32_le', () => {
	const array_buffer = ArrayBufferIO.alloc(8);
	array_buffer.data_view.setUint32(0, 4294967295, true);
	array_buffer.data_view.setUint32(4, 0, true);

	expect(array_buffer.read_uint32()).toBe(4294967295);
	expect(array_buffer.read_uint32()).toBe(0);
});

test('ArrayBufferIO.read_uint32_be', () => {
	const array_buffer = ArrayBufferIO.alloc(8);
	array_buffer.data_view.setUint32(0, 4294967295, false);
	array_buffer.data_view.setUint32(4, 0, false);

	expect(array_buffer.read_uint32_be()).toBe(4294967295);
	expect(array_buffer.read_uint32_be()).toBe(0);
});

test('ArrayBufferIO.read_int64_le', () => {
	const array_buffer = ArrayBufferIO.alloc(16);
	array_buffer.data_view.setBigInt64(0, 9223372036854775807n, true);
	array_buffer.data_view.setBigInt64(8, -9223372036854775808n, true);

	expect(array_buffer.read_int64()).toBe(9223372036854775807n);
	expect(array_buffer.read_int64()).toBe(-9223372036854775808n);
});

test('ArrayBufferIO.read_int64_be', () => {
	const array_buffer = ArrayBufferIO.alloc(16);
	array_buffer.data_view.setBigInt64(0, 9223372036854775807n, false);
	array_buffer.data_view.setBigInt64(8, -9223372036854775808n, false);

	expect(array_buffer.read_int64_be()).toBe(9223372036854775807n);
	expect(array_buffer.read_int64_be()).toBe(-9223372036854775808n);
});

test('ArrayBufferIO.read_uint64_le', () => {
	const array_buffer = ArrayBufferIO.alloc(16);
	array_buffer.data_view.setBigUint64(0, 18446744073709551615n, true);
	array_buffer.data_view.setBigUint64(8, 0n, true);

	expect(array_buffer.read_uint64()).toBe(18446744073709551615n);
	expect(array_buffer.read_uint64()).toBe(0n);
});

test('ArrayBufferIO.read_uint64_be', () => {
	const array_buffer = ArrayBufferIO.alloc(16);
	array_buffer.data_view.setBigUint64(0, 18446744073709551615n, false);
	array_buffer.data_view.setBigUint64(8, 0n, false);

	expect(array_buffer.read_uint64_be()).toBe(18446744073709551615n);
	expect(array_buffer.read_uint64_be()).toBe(0n);
});

test('ArrayBufferIO.read_float_le', () => {
	const array_buffer = ArrayBufferIO.alloc(8);
	array_buffer.data_view.setFloat32(0, 1.0, true);
	array_buffer.data_view.setFloat32(4, -1.0, true);

	expect(array_buffer.read_float()).toBe(1.0);
	expect(array_buffer.read_float()).toBe(-1.0);
});

test('ArrayBufferIO.read_float_be', () => {
	const array_buffer = ArrayBufferIO.alloc(8);
	array_buffer.data_view.setFloat32(0, 1.0, false);
	array_buffer.data_view.setFloat32(4, -1.0, false);

	expect(array_buffer.read_float_be()).toBe(1.0);
	expect(array_buffer.read_float_be()).toBe(-1.0);
});

test('ArrayBufferIO.read_double_le', () => {
	const array_buffer = ArrayBufferIO.alloc(16);
	array_buffer.data_view.setFloat64(0, 1.0, true);
	array_buffer.data_view.setFloat64(8, -1.0, true);

	expect(array_buffer.read_double()).toBe(1.0);
	expect(array_buffer.read_double()).toBe(-1.0);
});

test('ArrayBufferIO.read_double_be', () => {
	const array_buffer = ArrayBufferIO.alloc(16);
	array_buffer.data_view.setFloat64(0, 1.0, false);
	array_buffer.data_view.setFloat64(8, -1.0, false);

	expect(array_buffer.read_double_be()).toBe(1.0);
	expect(array_buffer.read_double_be()).toBe(-1.0);
});

test('ArrayBufferIO.write_int8', () => {
	const array_buffer = ArrayBufferIO.alloc(4);
	array_buffer.write_int8(127);
	array_buffer.write_int8(-128);
	array_buffer.write_int8(0);
	array_buffer.write_int8(-1);

	expect(array_buffer.data_view.getInt8(0)).toBe(127);
	expect(array_buffer.data_view.getInt8(1)).toBe(-128);
	expect(array_buffer.data_view.getInt8(2)).toBe(0);
	expect(array_buffer.data_view.getInt8(3)).toBe(-1);
});

test('ArrayBufferIO.write_uint8', () => {
	const array_buffer = ArrayBufferIO.alloc(4);
	array_buffer.write_uint8(255);
	array_buffer.write_uint8(0);
	array_buffer.write_uint8(127);
	array_buffer.write_uint8(128);

	expect(array_buffer.data_view.getUint8(0)).toBe(255);
	expect(array_buffer.data_view.getUint8(1)).toBe(0);
	expect(array_buffer.data_view.getUint8(2)).toBe(127);
	expect(array_buffer.data_view.getUint8(3)).toBe(128);
});

test('ArrayBufferIO.write_int16_le', () => {
	const array_buffer = ArrayBufferIO.alloc(4);
	array_buffer.write_int16(32767);
	array_buffer.write_int16(-32768);

	expect(array_buffer.data_view.getInt16(0, true)).toBe(32767);
	expect(array_buffer.data_view.getInt16(2, true)).toBe(-32768);
});

test('ArrayBufferIO.write_int16_be', () => {
	const array_buffer = ArrayBufferIO.alloc(4);
	array_buffer.write_int16_be(32767);
	array_buffer.write_int16_be(-32768);

	expect(array_buffer.data_view.getInt16(0, false)).toBe(32767);
	expect(array_buffer.data_view.getInt16(2, false)).toBe(-32768);
});

test('ArrayBufferIO.write_uint16_le', () => {
	const array_buffer = ArrayBufferIO.alloc(4);
	array_buffer.write_uint16(65535);
	array_buffer.write_uint16(0);

	expect(array_buffer.data_view.getUint16(0, true)).toBe(65535);
	expect(array_buffer.data_view.getUint16(2, true)).toBe(0);
});

test('ArrayBufferIO.write_uint16_be', () => {
	const array_buffer = ArrayBufferIO.alloc(4);
	array_buffer.write_uint16_be(65535);
	array_buffer.write_uint16_be(0);

	expect(array_buffer.data_view.getUint16(0, false)).toBe(65535);
	expect(array_buffer.data_view.getUint16(2, false)).toBe(0);
});

test('ArrayBufferIO.write_int32_le', () => {
	const array_buffer = ArrayBufferIO.alloc(8);
	array_buffer.write_int32(2147483647);
	array_buffer.write_int32(-2147483648);

	expect(array_buffer.data_view.getInt32(0, true)).toBe(2147483647);
	expect(array_buffer.data_view.getInt32(4, true)).toBe(-2147483648);
});

test('ArrayBufferIO.write_int32_be', () => {
	const array_buffer = ArrayBufferIO.alloc(8);
	array_buffer.write_int32_be(2147483647);
	array_buffer.write_int32_be(-2147483648);

	expect(array_buffer.data_view.getInt32(0, false)).toBe(2147483647);
	expect(array_buffer.data_view.getInt32(4, false)).toBe(-2147483648);
});

test('ArrayBufferIO.write_uint32_le', () => {
	const array_buffer = ArrayBufferIO.alloc(8);
	array_buffer.write_uint32(4294967295);
	array_buffer.write_uint32(0);

	expect(array_buffer.data_view.getUint32(0, true)).toBe(4294967295);
	expect(array_buffer.data_view.getUint32(4, true)).toBe(0);
});

test('ArrayBufferIO.write_uint32_be', () => {
	const array_buffer = ArrayBufferIO.alloc(8);
	array_buffer.write_uint32_be(4294967295);
	array_buffer.write_uint32_be(0);

	expect(array_buffer.data_view.getUint32(0, false)).toBe(4294967295);
	expect(array_buffer.data_view.getUint32(4, false)).toBe(0);
});

test('ArrayBufferIO.write_int64_le', () => {
	const array_buffer = ArrayBufferIO.alloc(16);
	array_buffer.write_int64(9223372036854775807n);
	array_buffer.write_int64(-9223372036854775808n);

	expect(array_buffer.data_view.getBigInt64(0, true)).toBe(9223372036854775807n);
	expect(array_buffer.data_view.getBigInt64(8, true)).toBe(-9223372036854775808n);
});

test('ArrayBufferIO.write_int64_be', () => {
	const array_buffer = ArrayBufferIO.alloc(16);
	array_buffer.write_int64_be(9223372036854775807n);
	array_buffer.write_int64_be(-9223372036854775808n);

	expect(array_buffer.data_view.getBigInt64(0, false)).toBe(9223372036854775807n);
	expect(array_buffer.data_view.getBigInt64(8, false)).toBe(-9223372036854775808n);
});

test('ArrayBufferIO.write_uint64_le', () => {
	const array_buffer = ArrayBufferIO.alloc(16);
	array_buffer.write_uint64(18446744073709551615n);
	array_buffer.write_uint64(0n);

	expect(array_buffer.data_view.getBigUint64(0, true)).toBe(18446744073709551615n);
	expect(array_buffer.data_view.getBigUint64(8, true)).toBe(0n);
});

test('ArrayBufferIO.write_uint64_be', () => {
	const array_buffer = ArrayBufferIO.alloc(16);
	array_buffer.write_uint64_be(18446744073709551615n);
	array_buffer.write_uint64_be(0n);

	expect(array_buffer.data_view.getBigUint64(0, false)).toBe(18446744073709551615n);
	expect(array_buffer.data_view.getBigUint64(8, false)).toBe(0n);
});

test('ArrayBufferIO.write_float_le', () => {
	const array_buffer = ArrayBufferIO.alloc(8);
	array_buffer.write_float(1.0);
	array_buffer.write_float(-1.0);

	expect(array_buffer.data_view.getFloat32(0, true)).toBe(1.0);
	expect(array_buffer.data_view.getFloat32(4, true)).toBe(-1.0);
});

test('ArrayBufferIO.write_float_be', () => {
	const array_buffer = ArrayBufferIO.alloc(8);
	array_buffer.write_float_be(1.0);
	array_buffer.write_float_be(-1.0);
	
	expect(array_buffer.data_view.getFloat32(0, false)).toBe(1.0);
	expect(array_buffer.data_view.getFloat32(4, false)).toBe(-1.0);
});

test('ArrayBufferIO.write_double_le', () => {
	const array_buffer = ArrayBufferIO.alloc(16);
	array_buffer.write_double(1.0);
	array_buffer.write_double(-1.0);

	expect(array_buffer.data_view.getFloat64(0, true)).toBe(1.0);
	expect(array_buffer.data_view.getFloat64(8, true)).toBe(-1.0);
});

test('ArrayBufferIO.write_double_be', () => {
	const array_buffer = ArrayBufferIO.alloc(16);
	array_buffer.write_double_be(1.0);
	array_buffer.write_double_be(-1.0);

	expect(array_buffer.data_view.getFloat64(0, false)).toBe(1.0);
	expect(array_buffer.data_view.getFloat64(8, false)).toBe(-1.0);
});

test('ArrayBufferIO.read_string', () => {
	const array_buffer = ArrayBufferIO.alloc(5);
	array_buffer.data_view.setUint8(0, 97);
	array_buffer.data_view.setUint8(1, 98);
	array_buffer.data_view.setUint8(2, 99);
	array_buffer.data_view.setUint8(3, 100);
	array_buffer.data_view.setUint8(4, 0);

	expect(array_buffer.read_string(4, 'utf-8')).toBe('abcd');
});

test('ArrayBufferIO.write_string', () => {
	const array_buffer = ArrayBufferIO.alloc(5);
	array_buffer.write_string('abcd');

	expect(array_buffer.data_view.getUint8(0)).toBe(97);
	expect(array_buffer.data_view.getUint8(1)).toBe(98);
	expect(array_buffer.data_view.getUint8(2)).toBe(99);
	expect(array_buffer.data_view.getUint8(3)).toBe(100);
	expect(array_buffer.data_view.getUint8(4)).toBe(0);
});
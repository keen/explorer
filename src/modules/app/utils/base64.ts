export const b64EncodeUnicode = (str: string) =>
  btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(
      _match,
      p1
    ) {
      return String.fromCharCode(('0x' + p1) as any);
    })
  );

export const b64DecodeUnicode = (str: string) =>
  decodeURIComponent(
    atob(str)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

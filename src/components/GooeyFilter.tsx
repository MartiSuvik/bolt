export default function GooeyFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
        <feComponentTransfer>
          <feFuncA type="discrete" tableValues="0 1" />
        </feComponentTransfer>
        <feGaussianBlur stdDeviation="5" />
        <feComponentTransfer>
          <feFuncA type="table" tableValues="-5 11" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}
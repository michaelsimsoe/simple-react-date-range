import React from 'react';

export const RangeInput = () => {
  const [error, setError] = React.useState('');
  const [fromDate, setFromDate] = React.useState('dd.mm.åååå');
  const [toDate, setToDate] = React.useState('dd.mm.åååå');

  const [isFromActive, setIsFromActive] = React.useState(false);
  const [isToActive, setIsToActive] = React.useState(false);

  const [manuallyTypeFromDate, setManuallyTypeFromDate] = React.useState(false);
  const [manuallyTypeToDate, setManuallyTypeToDate] = React.useState(false);

  const inputRef = React.useRef();

  const typeFromDateClass = manuallyTypeFromDate
    ? 'from-picker type-date'
    : 'from-picker';

  const typeToDateClass = manuallyTypeToDate
    ? 'to-picker type-date'
    : 'to-picker';

  const handleFromClick = event => {
    if (isFromActive) {
      setManuallyTypeFromDate(true);
      inputRef.current.focus();
      console.log('Element is active!');
    }
    setIsFromActive(true);
  };

  const handleToClick = event => {
    if (isToActive) {
      setManuallyTypeToDate(true);
      inputRef.current.focus();
      console.log('Element is active!');
    }
    setIsToActive(true);
  };

  const handleOnBlurFrom = () => {
    setIsFromActive(false);
    setManuallyTypeFromDate(false);
  };

  const handleOnBlurTo = () => {
    setIsToActive(false);
    setManuallyTypeToDate(false);
  };

  const toLocaleDate = date => {
    if (!date) return 'dd.mm.åååå';
    const local = new Date(date).toLocaleDateString('no-NO');
    return local
      .split('.')
      .map(num => (num < 10 ? `0${num}` : num))
      .join('.');
  };

  React.useEffect(() => {
    if (fromDate === 'dd.mm.åååå') {
      setError('');
      return;
    }
    if (fromDate > toDate) {
      setError('Dato "fra" må være før dato "til".');
    } else {
      setError('');
    }
  }, [fromDate, toDate]);

  return (
    <div className="range-picker-container">
      <div className={`range-picker ${error ? 'range-error' : ''}`}>
        <div
          className={typeFromDateClass}
          onMouseDown={e => handleFromClick(e)}
        >
          <input
            ref={inputRef}
            onChange={e => setFromDate(toLocaleDate(e.target.value))}
            id="date"
            type="date"
            onBlur={() => handleOnBlurFrom()}
          />
          <div className="from">{fromDate}</div>
        </div>
        <span className="separator"> - </span>
        <div className={typeToDateClass} onMouseDown={e => handleToClick(e)}>
          <input
            onChange={e => setToDate(toLocaleDate(e.target.value))}
            id="date"
            type="date"
            onBlur={() => handleOnBlurTo()}
          />
          <div className="from">{toDate}</div>
        </div>
      </div>
      <div className="date-range-error">{error && error}</div>
    </div>
  );
};

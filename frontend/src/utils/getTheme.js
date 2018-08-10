export default function getTheme(type) {
  const theme = {
    0: function () { return { id: 0, color: '#ffffff', bgColor: '#828282', dimBgColor: '#cccccc', region: '', shortName: '', state: 'wisconsin' }; },
    1: function () { return { id: 1, color: '#494949', bgColor: '#fad86b', dimBgColor: '#fef9e5', region: 'southern', shortName: 'Angelus Oaks', state: 'california' }; },
    2: function () { return { id: 2, color: '#494949', bgColor: '#fad86b', dimBgColor: '#fef9e5', region: 'northern', shortName: 'Napa', state: 'california' }; },
    3: function () { return { id: 3, color: '#494949', bgColor: '#90ccbb', dimBgColor: '#deece7', region: 'southern', shortName: 'Bruceville', state: 'texas' }; },
    4: function () { return { id: 4, color: '#494949', bgColor: '#90ccbb', dimBgColor: '#deece7', region: 'southern', shortName: 'New Ulm', state: 'texas' }; },
    5: function () { return { id: 5, color: '#ffffff', bgColor: '#c090cc', dimBgColor: '#ede5ee', region: 'northern', shortName: 'Lake Geneva', state: 'wisconsin' }; },
    6: function () { return { id: 6, color: '#ffffff', bgColor: '#c090cc', dimBgColor: '#ede5ee', region: 'northern', shortName: 'Mukwonago', state: 'wisconsin' }; }
  };
  return (theme[type]() || theme[0]());
}

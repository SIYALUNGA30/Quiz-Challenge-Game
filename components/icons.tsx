import React from 'react';

export const Trophy = (props) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props
  }, 
    React.createElement('path', { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6" }),
    React.createElement('path', { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18" }),
    React.createElement('path', { d: "M4 22h16" }),
    React.createElement('path', { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" }),
    React.createElement('path', { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" }),
    React.createElement('path', { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z" })
  )
);

export const Flag = (props) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props
  },
    React.createElement('path', { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" }),
    React.createElement('line', { x1: "4", x2: "4", y1: "22", y2: "15" })
  )
);

export const Lightbulb = (props) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props
  },
    React.createElement('path', { d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" }),
    React.createElement('path', { d: "M9 18h6" }),
    React.createElement('path', { d: "M10 22h4" })
  )
);

export const CheckCircle = (props) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props },
    React.createElement('path', { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
    React.createElement('polyline', { points: "22 4 12 14.01 9 11.01" })
  )
);

export const XCircle = (props) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props },
        React.createElement('circle', { cx: "12", cy: "12", r: "10" }),
        React.createElement('line', { x1: "15", y1: "9", x2: "9", y2: "15" }),
        React.createElement('line', { x1: "9", y1: "9", x2: "15", y2: "15" })
    )
);

export const LeaderboardIcon = (props) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props },
    React.createElement('path', { d: "M3 3v18h18" }),
    React.createElement('path', { d: "M7 12v4h4" }),
    React.createElement('path', { d: "M11 8v8h4" }),
    React.createElement('path', { d: "M15 4v12h4" })
  )
);

export const EmojiIcon = (props) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props },
        React.createElement('circle', { cx: "12", cy: "12", r: "10" }),
        React.createElement('path', { d: "M8 14s1.5 2 4 2 4-2 4-2" }),
        React.createElement('line', { x1: "9", y1: "9", x2: "9.01", y2: "9" }),
        React.createElement('line', { x1: "15", y1: "9", x2: "15.01", y2: "9" })
    )
);

export const SunIcon = (props) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props },
    React.createElement('circle', { cx: "12", cy: "12", r: "5" }),
    React.createElement('line', { x1: "12", y1: "1", x2: "12", y2: "3" }),
    React.createElement('line', { x1: "12", y1: "21", x2: "12", y2: "23" }),
    React.createElement('line', { x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64" }),
    React.createElement('line', { x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78" }),
    React.createElement('line', { x1: "1", y1: "12", x2: "3", y2: "12" }),
    React.createElement('line', { x1: "21", y1: "12", x2: "23", y2: "12" }),
    React.createElement('line', { x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36" }),
    React.createElement('line', { x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22" })
  )
);

export const MoonIcon = (props) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props },
    React.createElement('path', { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
  )
);
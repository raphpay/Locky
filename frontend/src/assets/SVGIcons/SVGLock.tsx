import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {}

const SVGLock = React.memo((props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={77}
    height={76}
    fill="none"
    {...props}
  >
    <g fill="currentColor" clipPath="url(#lock_square_dashed_svg__a)">
      <path d="M0 21.814h6.665v-8.618c0-4.289 2.277-6.474 6.417-6.474h8.569V.082h-8.652C4.347.082 0 4.33 0 12.866zM27.323 6.722H48.89V.082H27.323zm42.225 15.092h6.665v-8.948c0-8.495-4.346-12.784-12.998-12.784h-8.653v6.64h8.57c4.098 0 6.416 2.185 6.416 6.474zm0 26.804h6.665V27.464h-6.665zM54.562 76h8.653c8.652 0 12.998-4.289 12.998-12.783v-8.949h-6.665v8.619c0 4.288-2.318 6.474-6.416 6.474h-8.57zm-27.24 0h21.569v-6.64H27.323zM13 76h8.652v-6.64h-8.57c-4.14 0-6.416-2.185-6.416-6.473v-8.619H0v8.949C0 71.753 4.347 76 12.999 76M0 48.618h6.665V27.464H0zM23.183 54.227c0 3.093 1.366 4.536 4.223 4.536H48.85c2.898 0 4.264-1.444 4.264-4.536V37.815c0-2.887-1.201-4.29-3.685-4.454v-4.907c0-7.588-4.554-12.66-11.302-12.66s-11.301 5.072-11.301 12.66v4.907c-2.443.165-3.643 1.567-3.643 4.454zM31.13 33.32V28c0-4.825 2.815-8.041 6.996-8.041s6.997 3.216 6.997 8.04v5.32z" />
    </g>
    <defs>
      <clipPath id="lock_square_dashed_svg__a">
        <path fill="currentColor" d="M0 0h77v76H0z" />
      </clipPath>
    </defs>
  </svg>
));

export default SVGLock;

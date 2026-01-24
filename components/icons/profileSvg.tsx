const ProfileSVG = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    // viewBox="0 0 40 40"
    {...props}
  >
    <g filter="url(#a)">
      <path
        fill="#fff"
        d="M20 7a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm7 8c-1.379 0-9.5-1.122-9.5-2.5a2.5 2.5 0 1 1 5 0c0 1.381 5.881 2.5 4.5 2.5ZM20 0C11.162 0 4 7.162 4 16c0 8.837 7.162 16 16 16 8.837 0 16-7.163 16-16 0-8.838-7.163-16-16-16Zm0 29c-2.92 0-5.61-.98-7.781-2.612C13.3 24.312 15.4 23 17.762 23h4.481c2.36 0 4.457 1.313 5.543 3.388A12.938 12.938 0 0 1 20 29Zm10.012-4.719C28.325 21.644 25.45 20 22.238 20h-4.476c-3.21 0-6.084 1.64-7.774 4.28A12.932 12.932 0 0 1 7 16C7 8.831 12.832 3 20 3s13 5.832 13 13c0 3.144-1.125 6.031-2.988 8.281Z"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={40}
        height={40}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_956_381" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_956_381"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default ProfileSVG;

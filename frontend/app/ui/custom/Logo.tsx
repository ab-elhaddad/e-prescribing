export default function Logo({
  size,
  color,
}: {
  size: number;
  color?: string;
}) {
  const width = size;
  const height = (size * 112.651) / 115.609;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // width="15.6091"
      // height="112.651"
      width={width}
      height={height}
      viewBox="0 0 115.609 112.651"
    >
      <g id="Group_25" data-name="Group 25" transform="translate(-326.5 -29)">
        <g
          id="Icons_medicine-symbol"
          data-name="Icons/ medicine-symbol"
          transform="translate(329.5 32)"
        >
          <ellipse
            id="Oval"
            cx="8.431"
            cy="8.532"
            rx="8.431"
            ry="8.532"
            transform="translate(46.373)"
            fill="none"
            stroke={color || "#0c4a6e"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="6"
          />
          <path
            id="Path"
            d="M.75,0V25.6"
            transform="translate(54.055 72.523)"
            fill="none"
            stroke={color || "#0c4a6e"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="6"
          />
          <path
            id="Path-2"
            data-name="Path"
            d="M.75,0V38.395"
            transform="translate(54.055 34.128)"
            fill="none"
            stroke={color || "#0c4a6e"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="6"
          />
          <path
            id="Path-3"
            data-name="Path"
            d="M80.1,0V2.133a25.3,25.3,0,1,1-50.589,0V0L0,27.729,54.8,44.794l54.8-17.064Z"
            transform="translate(0 6.399)"
            fill="none"
            stroke={color || "#0c4a6e"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="6"
          />
          <path
            id="Path-4"
            data-name="Path"
            d="M2.287,12.234A5.126,5.126,0,0,1,0,8.266C0,3.637,8.822,0,19.605,0S39.211,3.637,39.211,8.266s-8.822,8.266-19.605,8.266"
            transform="translate(35.199 54.071)"
            fill="none"
            stroke={color || "#0c4a6e"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="6"
          />
          <path
            id="Path-5"
            data-name="Path"
            d="M5.48,14.931C2.108,13.225,0,11.092,0,8.532,0,3.839,7.588,0,16.863,0"
            transform="translate(37.942 72.523)"
            fill="none"
            stroke={color || "#0c4a6e"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="6"
          />
          <path
            id="Path-6"
            data-name="Path"
            d="M12.647,0c7.167,0,12.647,3.839,12.647,8.532s-5.48,8.532-12.647,8.532S0,13.225,0,8.532"
            transform="translate(42.157 89.587)"
            fill="none"
            stroke={color || "#0c4a6e"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="6"
          />
        </g>
      </g>
    </svg>
  );
}

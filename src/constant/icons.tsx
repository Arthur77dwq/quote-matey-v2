import { ComponentType, SVGProps } from 'react';

import { cn } from '@/lib/utils';

export function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      //   xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={cn('w-6 h-6', className)}
    >
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.8 32.7 29.4 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16.1 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.7 0-14.3 4.4-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.3 0 10.1-2 13.7-5.2l-6.3-5.2C29.3 35.3 26.8 36 24 36c-5.3 0-9.8-3.3-11.3-8l-6.6 5.1C9.6 39.6 16.3 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-1 2.8-3 5.2-5.6 6.9l6.3 5.2C39.9 36.7 44 30.8 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

export function ImageIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-5 h-5', className)}
    >
      <path
        d="M2.08333 8.75H7.91667C8.3769 8.75 8.75 8.3769 8.75 7.91667V2.08333C8.75 1.6231 8.3769 1.25 7.91667 1.25H2.08333C1.6231 1.25 1.25 1.6231 1.25 2.08333V7.91667C1.25 8.3769 1.6231 8.75 2.08333 8.75ZM2.08333 8.75L6.66667 4.16667L8.75 6.25M4.16667 3.54167C4.16667 3.88684 3.88684 4.16667 3.54167 4.16667C3.19649 4.16667 2.91667 3.88684 2.91667 3.54167C2.91667 3.19649 3.19649 2.91667 3.54167 2.91667C3.88684 2.91667 4.16667 3.19649 4.16667 3.54167Z"
        stroke="#4E5570"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TextIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn('w-5 h-5', className)}
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4_72)">
        <path
          d="M7.22222 1H2.63333C2.63333 1 2.63333 1 1 2.86667L1 8.11111C1 8.60203 1.34822 9 1.77778 9H7.22222C7.65178 9 8 8.60203 8 8.11111V1.88889C8 1.39797 7.65178 1 7.22222 1Z"
          stroke="#4E5570"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="2.95"
          y1="3.75"
          x2="6.05"
          y2="3.75"
          stroke="#4E5570"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
        <line
          x1="2.95"
          y1="4.75"
          x2="6.05"
          y2="4.75"
          stroke="#4E5570"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
        <line
          x1="2.95"
          y1="5.75"
          x2="6.05"
          y2="5.75"
          stroke="#4E5570"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
        <line
          x1="2.95"
          y1="6.75"
          x2="6.05"
          y2="6.75"
          stroke="#4E5570"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4_72">
          <rect width="9" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function Trend({ className }: { className?: string }) {
  return (
    <svg
      className={cn('w-5 h-5', className)}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4_58)">
        <path
          d="M9.58333 2.5L5.625 6.45833L3.54167 4.375L0.416667 7.5M9.58333 2.5H7.08333M9.58333 2.5V5"
          stroke="white"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4_58">
          <rect width="10" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
export function GraphWithSupport({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-5 h-5', className)}
    >
      <path
        fill="#1D1D1D"
        fillRule="evenodd"
        d="m2.038 8.124 3.94-3.448a1.391 1.391 0 1 1 2.697-.522l3.116 1.09a1.388 1.388 0 0 1 1.72-.323l3.591-3.068a1.391 1.391 0 1 1 .651.762l-3.59 3.068a1.391 1.391 0 1 1-2.703.506L8.345 5.1a1.388 1.388 0 0 1-1.706.33l-3.94 3.449a1.391 1.391 0 1 1-.66-.754ZM17.356 5.53a.63.63 0 0 0-.628.628v12.82a.63.63 0 0 0 .628.628h2.117a.63.63 0 0 0 .628-.628V6.158a.63.63 0 0 0-.628-.628h-2.117Zm-5.564 5.123a.63.63 0 0 0-.628.628v7.828a.63.63 0 0 0 .628.628h2.117a.63.63 0 0 0 .628-.628v-7.828a.63.63 0 0 0-.628-.628h-2.117Zm-5.565-1.84a.63.63 0 0 0-.628.629v9.799a.63.63 0 0 0 .628.628h2.117a.63.63 0 0 0 .628-.628v-9.8a.63.63 0 0 0-.628-.627H6.227ZM.663 14.222H2.78a.63.63 0 0 1 .628.628v4.523A.63.63 0 0 1 2.78 20H.663a.63.63 0 0 1-.628-.628v-4.523a.63.63 0 0 1 .628-.628Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Boost({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={(cn('w-5 h-5'), className)}
    >
      <path
        fill="#1D1D1D"
        d="M19.914.273a.226.226 0 0 0-.157-.165c-2.618-.64-8.664 1.64-11.94 4.915a14.174 14.174 0 0 0-1.59 1.881c-1.01-.09-2.02-.013-2.883.362C.914 8.334.207 11.127.006 12.325a.43.43 0 0 0 .353.496.61.61 0 0 0 .121.004l3.901-.429c.004.295.022.59.054.88a.877.877 0 0 0 .254.537l1.51 1.505a.878.878 0 0 0 .537.255c.29.031.58.05.876.054l-.43 3.896a.429.429 0 0 0 .501.47c1.198-.193 3.995-.899 5.059-3.33.375-.862.45-1.867.366-2.873a14.267 14.267 0 0 0 1.886-1.59c3.284-3.267 5.55-9.179 4.92-11.927Zm-5.17 8.025a2.14 2.14 0 0 1-3.03 0 2.141 2.141 0 0 1 0-3.034 2.144 2.144 0 1 1 3.029 3.034Z"
      />
      <path
        fill="#1D1D1D"
        d="M6.097 16.41c-.246.245-.64.339-1.113.424-1.063.178-2.002-.738-1.81-1.81.072-.407.29-.979.425-1.113a.197.197 0 0 0 .004-.277.192.192 0 0 0-.165-.058 2.677 2.677 0 0 0-1.568.764C.815 15.395.717 19.296.717 19.296s3.905-.098 4.955-1.153c.425-.425.693-.974.764-1.573.018-.183-.21-.295-.34-.16Z"
      />
    </svg>
  );
}

export function Performance({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#FFF"
      className={cn('size-6', className)}
      viewBox="0 -960 960 960"
    >
      <path d="M480-316.5q38-.5 56-27.5l224-336-336 224q-27 18-28.5 55t22.5 61 62 23.5m0-483.5q59 0 113.5 16.5T696-734l-76 48q-33-17-68.5-25.5T480-720q-133 0-226.5 93.5T160-400q0 42 11.5 83t32.5 77h552q23-38 33.5-79t10.5-85q0-36-8.5-70T766-540l48-76q30 47 47.5 100T880-406t-13 109-41 99q-11 18-30 28t-40 10H204q-21 0-40-10t-30-28q-26-45-40-95.5T80-400q0-83 31.5-155.5t86-127 127.5-86T480-800m7 313" />
    </svg>
  );
}

export function ToolBox({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-6', className)}
      fill="#FFF"
      viewBox="0 -960 960 960"
    >
      <path d="M80-160v-400q0-33 23.5-56.5T160-640h120v-80q0-33 23.5-56.5T360-800h240q33 0 56.5 23.5T680-720v80h120q33 0 56.5 23.5T880-560v400zm240-200v40h-80v-40h-80v120h640v-120h-80v40h-80v-40zM160-560v120h80v-40h80v40h320v-40h80v40h80v-120zm200-80h240v-80H360z" />
    </svg>
  );
}

export function Tools({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-6', className)}
      fill="#FFF"
      viewBox="0 -960 960 960"
    >
      <path d="M756-120 537-339l84-84 219 219zm-552 0-84-84 276-276-68-68-28 28-51-51v82l-28 28-121-121 28-28h82l-50-50 142-142q20-20 43-29t47-9 47 9 43 29l-92 92 50 50-28 28 68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701-841q15 0 28.5 3t27.5 9l-99 99 72 72 99-99q7 14 9.5 27.5T841-701q0 59-40.5 99.5T701-561q-12 0-24-2t-23-7z" />
    </svg>
  );
}

export const IconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  google: GoogleIcon,
  image: ImageIcon,
  text: TextIcon,
  trend: Trend,
  graph: GraphWithSupport,
  boost: Boost,
  performance: Performance,
  toolBox: ToolBox,
  tools: Tools,
};

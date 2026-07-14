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

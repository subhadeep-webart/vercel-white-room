export const SPINDRIFTWEBSITE = "https://www.spindriftmedia.com/";

export const INSTAGRAM_LINK = "https://www.instagram.com/thewhiteroomsband/";

export const INSTAGRAM_TOKEN = process.env.INSTAGRAM_API;

export const NAV_MENU_ITEMS = [
  {
    key: "about-us",
    label: "ABOUT US",
    href: "/about-us",
    imgSrc: "/assets/images/about-us-img-1.png",
  },
  // { key: "videos", label: "VIDEOS", href: "#", imgSrc: "/assets/images/about-us-img-2.png" },
  {
    key: "media",
    label: "MEDIA",
    href: "/media-us",
    imgSrc: "/assets/images/about-us-img-1.png",
  },
  {
    key: "testimonials",
    label: "TESTIMONIALS",
    href: "/testimonials",
    imgSrc: "/assets/images/about-us-img-1.png",
  },
  {
    key: "shop",
    label: "SHOP",
    href: "/shop",
    imgSrc: "/assets/images/about-us-img-1.png",
  },
  {
    key: "book-us",
    label: "BOOK US",
    href: "/book-us",
    imgSrc: "/assets/images/about-us-img-1.png",
  },
  {
    key: "on-the-day",
    label: "ON THE DAY",
    href: "/on-the-day",
    imgSrc: "/assets/images/about-us-img-1.png",
  },
  {
    key: "contact-us",
    label: "CONTACT US",
    href: "/contact-us",
    imgSrc: "/assets/images/about-us-img-1.png",
  },
];

export const config = {
  matcher: ["/", "/admin/:path*"], // Match root and all admin paths
};

import {
  BookOpen,
  Bot,
  Calendar,
  GalleryVerticalEnd,
  Music,
  SquareTerminal,
  Store,
} from "lucide-react";

export const ADMIN_CONFIG_DATA = {
  user: {
    name: "Admin",
    email: "admin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "The White Rooms",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/admin/dashboard/home",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Banners",
          url: "/admin/dashboard/home/banners",
        },
        {
          title: "Artist Section",
          url: "/admin/dashboard/home/artist-section",
        },
        // {
        //     title: "About Us",
        //     url: "/admin/dashboard/home/about-us",
        // },
        {
          title: "Instagram Feed",
          url: "/admin/dashboard/home/instagram-feed",
        },
        {
          title: "Press Coverage",
          url: "/admin/dashboard/home/press-coverage",
        },

        {
          title: "Worked For",
          url: "/admin/dashboard/home/worked-for",
        },
        {
          title: "Choose Us",
          url: "/admin/dashboard/home/choose-us",
        },
      ],
    },
    {
      title: "About Us",
      url: "/admin/dashboard/aboutUs",
      icon: Bot,
      items: [
        {
          title: "Banner",
          url: "/admin/dashboard/aboutUs/about-us/banner",
        },
        {
          title: "About Us",
          url: "/admin/dashboard/aboutUs/about-us",
        },
        {
          title: "Images",
          url: "/admin/dashboard/aboutUs/about-us/images",
        },
      ],
    },
    {
      title: "Media",
      url: "/admin/dashboard/media",
      icon: Music,
      items: [
        {
          title: "Banner",
          url: "/admin/dashboard/media/banner",
        },
        {
          title: "Media Assets",
          url: "/admin/dashboard/media",
        },
      ],
    },
    {
      title: "Book Us",
      url: "/admin/dashboard/bookingUs",
      icon: BookOpen,
      items: [
        {
          title: "Banner",
          url: "/admin/dashboard/bookingUs/banner",
        },
        {
          title: "Booking Process",
          url: "/admin/dashboard/bookingUs/booking-process",
        },
        {
          title: "Get With Booking",
          url: "/admin/dashboard/bookingUs/get-with-booking",
        },
        {
          title: "Spoke Production",
          url: "/admin/dashboard/bookingUs/spoke-production",
        },
        {
          title: "For Larger Show",
          url: "/admin/dashboard/bookingUs/for-larger-show",
        },
        {
          title: "Optional Add On",
          url: "/admin/dashboard/bookingUs/optional-add-on",
        },
      ],
    },
    {
      title: "Testimonial",
      url: "/admin/dashboard/testimonial",
      icon: Calendar,
      items: [
        {
          title: "Banner",
          url: "/admin/dashboard/testimonial/banner",
        },
        {
          title: "What They Say",
          url: "/admin/dashboard/testimonial/what-they-say",
        },
      ],
    },
    {
      title: "Shop",
      url: "/admin/dashboard/shop",
      icon: Store,
      items: [
        {
          title: "Banner",
          url: "/admin/dashboard/shop/banner",
        },
        {
          title: "Content",
          url: "/admin/dashboard/shop/content",
        },
      ],
    },
    {
      title: "On The Day",
      url: "/admin/dashboard/on-the-day",
      icon: Calendar,
      items: [
        {
          title: "Banner",
          url: "/admin/dashboard/on-the-day/banner",
        },
        {
          title: "Content",
          url: "/admin/dashboard/on-the-day/content",
        },
      ],
    },
  ],
};

// Press Coverages Table header
export const PRESS_COVERAGE_COLUMNS = [
  { header: "Poster Title", accessorKey: "poster_title" },
  { header: "Poster Image", accessorKey: "poster_image" },
  { header: "Poster Song", accessorKey: "poster_song" },
  { header: "Song Image", accessorKey: "song_image" },
  { header: "Actions", accessorKey: "actions" },
];

export const MEDIA_COVERAGE_TABLE_COLUMNS = [
  { header: "Media Title", accessorKey: "title" },
  { header: "Media Asset", accessorKey: "file_url" },
  { header: "Actions", accessorKey: "actions" },
];

export const ON_THE_TABLE_COLUMNS = [
  { header: "Section Image Url", accessorKey: "section_image_url" },
  { header: "Title", accessorKey: "title" },
  { header: "Description", accessorKey: "description" },
  { header: "Actions", accessorKey: "actions" },
];

export const ALL_REVIEWS_TABLE_COLUMNS = [
  { header: "Names", accessorKey: "name" },
  { header: "Position", accessorKey: "position" },
  { header: "Descriptions", accessorKey: "comment" },
  { header: "Ratings", accessorKey: "rating" },
  {
    header: "Actions",
    accessorKey: "actions",
    align: "right",
  },
];

export const INSTAGRAM_CONFIGURATION = {
  user_id: "17841404064152965",
  username: "thewhiteroomsband",
  id: "24827167166959629",
};

export const MASONARY_BREAKPOINT = {
  default: 4, // Desktop
  1100: 3, // Laptop
  700: 2, // Tablet
  500: 1, // Mobile
};

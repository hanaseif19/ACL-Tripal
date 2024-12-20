import {
  LayoutDashboard,
  AlertCircle,
  UserPlus,
  Users,
  UserMinus,
  MessagesSquare,
  TagsIcon,
  KeyRound,
  Heart,
  LineChart,
  LogOut,
  Martini,
  ShoppingCart,
  FerrisWheel, CirclePercent
} from 'lucide-react';

export const sidebarItems = [
  {
    id: 1,
    href: "/admin",
    icon: <LayoutDashboard size={26} />,
    label: "Dashboard",
  },
  {
    id: 2,
    href: "/admin/complaints",
    icon: <AlertCircle size={26} />,
    label: "Complaints",
  },
  {
    id: 3,
    href: "/admin/new-admin",
    icon: <UserPlus size={26} />,
    label: "Add Admin",
  },
  {
    id: 4,
    href: "/admin/new-governor",
    icon: <Users size={26} />,
    label: "Add Governor",
  },
  {
    id: 53,
    href: "/admin/delete-user",
    icon: <UserMinus size={26} />,
    label: "Delete Users",
  },
  {
    id: 6,
    href: "/admin/requests",
    icon: <MessagesSquare size={26} />,
    label: "Manage Requests",
  },
  {
    id: 7,
    href: "/activity-categories",
    icon: <TagsIcon size={26} />,
    label: "Activity Categories",
  },
  {
    id: 9,
    href: "/admin/activities",
    icon: <Martini size={26} />,
    label: "All Activities",
  },
  {
    id: 10,
    href: "/admin/itineraries",
    icon: <FerrisWheel size={26} />,
    label: "All Itineraries",
  },
  {
    id: 14,
    href: "/admin/view-products",
    icon: <ShoppingCart size={26} />,
    label: "Products"
  },
  {
    id: 11,
    href: "/admin/changepassword",
    icon: <KeyRound size={26} />,
    label: "Change Password",
  },
  {
    id: 12,
    href: "/preference-tags",
    icon: <Heart size={26} />,
    label: "Preference Tags",
  },
  {
    id: 13,
    href: "/revenue",
    icon: <LineChart size={26} />,
    label: "Revenue",
  },
  {
    id: 15,
    href: "/admin/promo-codes",
    icon: <CirclePercent />,
    label: "Promo Codes",
  },
  {
    id: 8,
    icon: <LogOut size={26} />,
    label: "Logout"
  },
];

export const states = [
  {
    id: 1,
    title: "Total Users",
    amount: "$10,800",
    
    iconClass: "icon-wallet text-accent-1",
  },
  {
    id: 2,
    title: "Total Pending",
    amount: "$12,800",
    today: "40+",
    iconClass: "icon-payment text-accent-1",
  },
  {
    id: 3,
    title: "Total Booking",
    amount: "$54,800",
    today: "90+",
    iconClass: "icon-booking text-accent-1",
  },
  {
    id: 4,
    title: "Wishlist",
    amount: "1834",
    today: "290+",
    iconClass: "icon-heart text-accent-1",
  },
];

export const notificationData = [
  {
    id: 1,
    icon: "icon-home",
    message: "Your listing House on the Beverly Hills has been approved",
  },
  {
    id: 2,
    icon: "icon-review",
    message: "Dollie Horton left a review on House on the Northridge",
  },
  {
    id: 3,
    icon: "icon-heart",
    message: "Someone favorites your Triple Story House for Rent listing",
  },
  {
    id: 4,
    icon: "icon-heart",
    message: "Someone favorites your Triple Story House for Rent listing",
  },
  {
    id: 5,
    icon: "icon-home",
    message: "Your listing House on the Beverly Hills has been approved",
  },
  {
    id: 6,
    icon: "icon-review",
    message: "Dollie Horton left a review on House on the Northridge",
  },
];

export var adminNotification = [
  
];

export const tabContentStaticties = [
  {
    id: 1,
    label: "Hours",
    data: [
      { name: "12PM", value: 148 },
      { name: "2AM", value: 100 },
      { name: "4AM", value: 205 },
      { name: "6AM", value: 110 },
      { name: "8AM", value: 165 },
      { name: "10AM", value: 145 },
      { name: "12AM", value: 180 },
      { name: "2PM", value: 156 },
      { name: "4PM", value: 148 },
      { name: "6PM", value: 220 },
      { name: "8PM", value: 180 },
      { name: "10PM", value: 245 },
    ],
  },
  {
    id: 2,
    label: "Weekly",
    data: [
      { name: "1st", value: 158 },

      { name: "2nd", value: 210 },
      { name: "3rd", value: 180 },
      { name: "4th", value: 235 },
      { name: "5th", value: 100 },
    ],
  },
  {
    id: 3,
    label: "Monthly",
    data: [
      { name: "Jan", value: 158 },
      { name: "Feb", value: 100 },
      { name: "Marc", value: 235 },
      { name: "April", value: 210 },
      { name: "May", value: 165 },
      { name: "Jun", value: 145 },
      { name: "July", value: 190 },
      { name: "Agust", value: 156 },
      { name: "Sept", value: 148 },
      { name: "Oct", value: 210 },
      { name: "Now", value: 180 },
      { name: "Dec", value: 235 },
    ],
  },
];

export var StatictiesAdminUsers = [
  {
    id: 0,
    label: "Monthly",
    data: [
      { name: "Jan", value: 158 },
      { name: "Feb", value: 100 },
      { name: "Marc", value: 235 },
      { name: "April", value: 210 },
      { name: "May", value: 165 },
      { name: "Jun", value: 145 },
      { name: "July", value: 190 },
      { name: "Agust", value: 156 },
      { name: "Sept", value: 148 },
      { name: "Oct", value: 210 },
      { name: "Now", value: 180 },
      { name: "Dec", value: 235 },
    ],
  },
  {
    id: 1,
    label: "Year",
    data: [
      { name: "2019", value: 0 },
      { name: "2020", value: 0 },
      { name: "2021", value: 0 },
      { name: "2022", value: 0 },
      { name: "2023", value: 0 },
      { name: "2024", value: 10 },
    ],
  },
 
];

export const bookingData = [
  {
    id: 1,
    orderNumber: "#484",
    imageUrl: "/img/dashboard/booking/1.jpg",
    title:
      "Phi Phi Islands Adventure Day Trip with Seaview Lunch by V. Marine Tour",
    startDate: "11 April 2023",
    endDate: "11 April 2023",
    numberOfPeople: "2 People",
    cost: "$392.89",
    status: "Approved",
  },
  {
    id: 2,
    orderNumber: "#485",
    imageUrl: "/img/dashboard/booking/2.jpg",
    title: "Zipline 18 Platform and ATV Adventure Tour From Phuket",
    startDate: "12 April 2023",
    endDate: "12 April 2023",
    numberOfPeople: "3 People",
    cost: "$412.50",
    status: "Pending",
  },
  {
    id: 3,
    orderNumber: "#486",
    imageUrl: "/img/dashboard/booking/3.jpg",
    title: "Phang Nga Bay & James Bond Island with Canoeing By Big Boat",
    startDate: "13 April 2023",
    endDate: "13 April 2023",
    numberOfPeople: "4 People",
    cost: "$550.00",
    status: "Cancelled",
  },
  {
    id: 4,
    orderNumber: "#487",
    imageUrl: "/img/dashboard/booking/4.jpg",
    title: "James Bond Island Tour from Phuket by Longtail Boat with Lunch",
    startDate: "14 April 2023",
    endDate: "14 April 2023",
    numberOfPeople: "2 People",
    cost: "$420.99",
    status: "Pending",
  },
  {
    id: 5,
    orderNumber: "#488",
    imageUrl: "/img/dashboard/booking/5.jpg",
    title: "Phuket City Tour: Karon View Point, Big Buddha & Wat Chalong",
    startDate: "15 April 2023",
    endDate: "15 April 2023",
    numberOfPeople: "3 People",
    cost: "$380.00",
    status: "Approved",
  },
];

export const messageSanders = [
  {
    id: 1,
    image: "/img/dashboard/messages/sidebar/1.png",
    badgeColor: "",
    badgeText: "2",
    name: `Darlene Robertson`,
    role: `Head of Development`,
    time: `35 mins`,
  },
  {
    id: 2,
    image: "/img/dashboard/messages/sidebar/2.png",
    badgeColor: "bg-accent-2",
    badgeText: "2",
    name: `Darlene Robertson`,
    role: `Head of Development`,
    time: `35 mins`,
  },
  {
    id: 3,
    image: "/img/dashboard/messages/sidebar/3.png",
    badgeColor: "bg-green-3",
    badgeText: "2",
    name: `Darlene Robertson`,
    role: `Head of Development`,
    time: `35 mins`,
  },
  {
    id: 4,
    image: "/img/dashboard/messages/sidebar/4.png",
    badgeColor: "",
    badgeText: "",
    name: `Darlene Robertson`,
    role: `Head of Development`,
    time: `35 mins`,
  },
  {
    id: 5,
    image: "/img/dashboard/messages/sidebar/5.png",
    badgeColor: "bg-yellow-3",
    badgeText: "2",
    name: `Darlene Robertson`,
    role: `Head of Development`,
    time: `35 mins`,
  },
  {
    id: 6,
    image: "/img/dashboard/messages/sidebar/6.png",
    badgeColor: "",
    badgeText: "",
    name: `Darlene Robertson`,
    role: `Head of Development`,
    time: `35 mins`,
  },
  {
    id: 7,
    image: "/img/dashboard/messages/sidebar/7.png",
    badgeColor: "",
    badgeText: "",
    name: `Darlene Robertson`,
    role: `Head of Development`,
    time: `35 mins`,
  },
  {
    id: 8,
    image: "/img/dashboard/messages/sidebar/8.png",
    badgeColor: "",
    badgeText: "",
    name: `Darlene Robertson`,
    role: `Head of Development`,
    time: `35 mins`,
  },
];
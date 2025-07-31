export type Project = {
  id: number;
  title: string;
  type: "NARRATIVE" | "COMMERCIAL" | "MUSIC VIDEO";
  thumbnailUrl: string; // Static image URL
  gifUrl: string; // GIF URL for hover effect
  vimeoId?: string; // Optional Vimeo video ID
  vimeoHash?: string; // Optional Vimeo hash parameter for private videos
  description?: string; // Optional project description
  crew?: { role: string; name: string }[]; // Optional array for cast/crew
};

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Doritos Mortis",
    type: "COMMERCIAL",
    thumbnailUrl:
      "https://placehold.co/400x225/222222/bbbbbb?text=Doritos+Mortis+Thumb",
    gifUrl:
      "https://placehold.co/400x225/222222/bbbbbb/gif?text=Doritos+Mortis+GIF",
    vimeoId: "1031808283",
    vimeoHash: "d0897cf7b5",
    crew: [
      { role: "Director", name: "Reece Daniels & Jack Degnan" },
      { role: "Executive Producer", name: "Jivensley Alexis" },
      { role: "Written & Produced", name: "Nick Knezevich, Reece Daniels, Jivensley Alexis & Jack Degnan" },
      { role: "Associate Producer", name: "Aashish Joshi" },
      { role: "Starring", name: "Nick Knezevich, Bill Glasser, Robin Roth, Joseph Harrow" },
      { role: "1st AD", name: "Cassie Kulish" },
      { role: "D.P.", name: "Woulfe Bova" },
      { role: "Gaffer / AC", name: "Clint Pang" },
      { role: "Production Designer", name: "Menny Son" },
      { role: "Sound Mix", name: "Liam Donahue" },
      { role: "HMU", name: "Sophia Karesh" },
      { role: "Edit", name: "Aashish Joshi" },
      { role: "Post Sound", name: "Jenna Tresidder" },
      { role: "Color", name: "Ben Cerauli" },
    ],
  },
  {
    id: 2,
    title: "Graywind Blinds",
    type: "COMMERCIAL",
    thumbnailUrl:
      "https://placehold.co/400x225/333333/cccccc?text=Graywind+Blinds+Thumb",
    gifUrl:
      "https://placehold.co/400x225/333333/cccccc/gif?text=Graywind+Blinds+GIF",
    vimeoId: "1065705607",
    vimeoHash: "b403cd7610",
    crew: [
      { role: "Cast", name: "Chelsea Lee Wheatley, Wes Meserve" },
      { role: "Agency", name: "Nectarine" },
      { role: "Production Company", name: "Kairon Pictures" },
      { role: "Producer", name: "Michael Perrone" },
      { role: "Executive Producer", name: "Reece Daniels" },
      { role: "1st AD", name: "Rebekah Strauss" },
      { role: "D.P.", name: "Tobert Torres" },
      { role: "1st AC", name: "Carter Chun" },
      { role: "Gaffer", name: "Marat G" },
      { role: "Key Grip", name: "Liam Podos" },
      { role: "Production Design", name: "Lucky Us" },
      { role: "Sound", name: "Gavin Cornelius Edmonds" },
      { role: "PAs", name: "Chris Martinez & Adison Knies" },
      { role: "Color", name: "Alexia Salingaros" },
      { role: "Post Sound", name: "Francisco Nobile" },
      { role: "Edit", name: "Aashish Joshi" },
    ],
  },
  {
    id: 3,
    title: "Nigaam Jewels",
    type: "COMMERCIAL",
    thumbnailUrl:
      "https://placehold.co/400x225/444444/dddddd?text=Nigaam+Jewels+Thumb",
    gifUrl:
      "https://placehold.co/400x225/444444/dddddd/gif?text=Nigaam+Jewels+GIF",
    vimeoId: "1065704065",
    vimeoHash: "72c8bb8562",
    crew: [], // No explicit crew listed in the raw data for this one, only the Vimeo embed
  },
  {
    id: 4,
    title: "Pass Go - Jordan Webb",
    type: "MUSIC VIDEO",
    thumbnailUrl:
      "https://placehold.co/400x225/888888/bbbbbb?text=Pass+Go+Thumb",
    gifUrl:
      "https://placehold.co/400x225/888888/bbbbbb/gif?text=Pass+Go+GIF",
    vimeoId: "984158469",
    vimeoHash: undefined, // Vimeo embed doesn't provide a hash
    crew: [
      { role: "Featuring", name: "Joseph Coffey, Elijah McCoy, Michael James Vargas" },
      { role: "Director/Editor", name: "Reece Daniels" },
      { role: "Producer", name: "Menny Son" },
      { role: "Executive Producer", name: "MEZMER / Chaz Hawkins" },
      { role: "Unit Production Manager", name: "Jivensley Alexis" },
      { role: "D.P.", name: "Matt Liang" },
      { role: "1st AD", name: "Cassie Kulish" },
      { role: "Production Designer", name: "Menny Son" },
      { role: "Gaffer", name: "Nash White" },
      { role: "Key Grip", name: "Daniel Cho" },
      { role: "1st AC", name: "Carolina" },
      { role: "2nd AC", name: "Naixin" },
      { role: "Grip", name: "Jesse Mejia" },
      { role: "Additional Cinematography", name: "Harshith Kotni" },
      { role: "PAs", name: "Olivia Steinberg & Elizabeth Winters" },
      { role: "VFX", name: "Aashish Joshi" },
      { role: "Color", name: "Ben Cerauli" },
    ],
  },
  {
    id: 5,
    title: "Back to Sender - Zyodara ft. Yasmina",
    type: "MUSIC VIDEO",
    thumbnailUrl:
      "https://placehold.co/400x225/999999/cccccc?text=Back+to+Sender+Thumb",
    gifUrl:
      "https://placehold.co/400x225/999999/cccccc/gif?text=Back+to+Sender+GIF",
    vimeoId: "827845705",
    vimeoHash: undefined, // Vimeo embed doesn't provide a hash
    crew: [], // No explicit crew listed in the raw data for this one
  },
  {
    id: 6,
    title: "More - Jordan Webb ft. Luey Northern",
    type: "MUSIC VIDEO",
    thumbnailUrl:
      "https://placehold.co/400x225/AAAAAA/dddddd?text=More+Thumb",
    gifUrl: "https://placehold.co/400x225/AAAAAA/dddddd/gif?text=More+GIF",
    vimeoId: "1065504245",
    vimeoHash: "bfc91a23f5",
    crew: [
      { role: "Director", name: "Reece Daniels" }, // Inferred from similar projects/structure
      { role: "Executive Producer", name: "Chaz Hawkins" },
      { role: "Line Producer", name: "Jivensley Alexis" },
      { role: "1st AD", name: "Cassie Kulish" },
      { role: "D.P.", name: "Matt Liang" },
      { role: "1st AC", name: "Olivia Steinberg" },
      { role: "2nd AC", name: "Clint Pang" },
      { role: "Production Designer", name: "Menny Son" },
      { role: "Edit", name: "Reece Daniels" },
      { role: "Color", name: "Alexia Salingaros" },
      { role: "VFX", name: "Thermonuclear" },
      { role: "VFX", name: "Aashish Joshi" },
    ],
  },
  {
    id: 7,
    title: "Freak",
    type: "NARRATIVE",
    thumbnailUrl:
      "https://placehold.co/400x225/BBBBBB/eeeeee?text=Freak+Thumb",
    gifUrl: "https://placehold.co/400x225/BBBBBB/eeeeee/gif?text=Freak+GIF",
    vimeoId: undefined, // No Vimeo link provided, only stills
    vimeoHash: undefined,
    crew: [
      { role: "Directed", name: "Aashish Joshi & Nick Knezevich" },
      { role: "Written by", name: "Aashish Joshi & Nick Knezevich" },
    ],
  },
  {
    id: 8,
    title: "HIT - Lotionmoney",
    type: "MUSIC VIDEO",
    thumbnailUrl:
      "https://placehold.co/400x225/CCCCCC/bbbbbb?text=HIT+Thumb",
    gifUrl: "https://placehold.co/400x225/CCCCCC/bbbbbb/gif?text=HIT+GIF",
    vimeoId: "913184069",
    vimeoHash: "419a08b576",
    crew: [
      { role: "Artist", name: "Lotionmoney" },
      { role: "Starring", name: "Cameron Pillitteri" },
      { role: "Directed", name: "Reece Daniels" },
      { role: "Producer", name: "Do Young Kim" },
      { role: "Edit", name: "Reece Daniels & Aashish Joshi" },
      { role: "VFX", name: "Aashish Joshi" },
      { role: "Color", name: "Ben Cerauli" },
      { role: "Production Manager", name: "Jivensley Alexis" },
      { role: "1st AD", name: "Keith Leung" },
      { role: "D.P.", name: "Kim Johnson" },
      { role: "1st AC", name: "Hayley Augustini" },
      { role: "Production Designer", name: "Menny Son" },
      { role: "Production Assistants", name: "Lucas Sun" },
    ],
  },
  {
    id: 9,
    title: "Coofandy x JGR",
    type: "COMMERCIAL",
    thumbnailUrl:
      "https://placehold.co/400x225/DDDDDD/aaaaaa?text=Coofandy+Thumb",
    gifUrl: "https://placehold.co/400x225/DDDDDD/aaaaaa/gif?text=Coofandy+GIF",
    vimeoId: "1105948094",
    vimeoHash: "be1234ce86",
    crew: [{ role: "Directed", name: "Keith Leung" }],
  },
  {
    id: 10,
    title: "I, Chinese",
    type: "NARRATIVE",
    thumbnailUrl:
      "https://placehold.co/400x225/555555/eeeeee?text=I+Chinese+Thumb",
    gifUrl:
      "https://placehold.co/400x225/555555/eeeeee/gif?text=I+Chinese+GIF",
    vimeoId: undefined, // No Vimeo link provided
    vimeoHash: undefined,
    crew: [
      { role: "Producers", name: "Menny Son, Nasaidad, Reece Daniels" },
      { role: "Executive Producers", name: "Jane Leung / Sylvia Lau / Dylan Park / Cara Side" },
      { role: "Casting", name: "Peter Xiao" },
      { role: "Cast", name: "Chin Ho Fung, James Tam, Dominic Wong, Nina Marie, Jun Suenaga, Pranava Kumar, Jack Forbes" },
      { role: "1st AD", name: "Thomas Wu" },
      { role: "2nd AD", name: "Sam Kumiko Sheridan" },
      { role: "Production Design", name: "Julie Zhao" },
      { role: "Editor", name: "Thomas Wu" },
      { role: "D.P.", name: "Clint Pang" },
      { role: "1st AC", name: "Harshith Kotni" },
      { role: "2nd AC", name: "Sebastian Rodriguez / Mike Wavey" },
      { role: "Camera Op", name: "Ruben Frischeisen" },
      { role: "Gaffer", name: "Kim Johnson" },
      { role: "Key Grip", name: "Jack Zhang" },
      { role: "Grips", name: "Sebastian Zufelt, Nikki Page, Ben See-Tho, Sean Chow, Juli Alonso, Ethan Berger, Marlo Irani" },
      { role: "Sound Mixer", name: "Addison Knies" },
      { role: "Boom", name: "Callie Schultz / Caleb HJ Kim" },
      { role: "HMU", name: "Christina Kim" },
      { role: "Art Assists", name: "Meg Yamada / Bridgette Gong" },
      { role: "Score", name: "Ha Chang Jin" },
      { role: "Script Supervisor", name: "Claudia Mendez & Elizabeth Winters" },
      { role: "P.A.", name: "Noa Drochak" },
      { role: "BTS", name: "Murtaza" },
      { role: "Post Sound", name: "Thomas Wu" },
      { role: "Foley", name: "Jeremy Chi" },
      { role: "Color", name: "Miles Colby Perreault" },
      { role: "Posters", name: "Jeffery Leung" },
    ],
  },
  {
    id: 11,
    title: "Damien’s Gym",
    type: "NARRATIVE",
    thumbnailUrl:
      "https://placehold.co/400x225/666666/ffffff?text=Damiens+Gym+Thumb",
    gifUrl:
      "https://placehold.co/400x225/666666/ffffff/gif?text=Damiens+Gym+GIF",
    vimeoId: undefined, // No Vimeo link provided, only stills
    vimeoHash: undefined,
    crew: [
      { role: "Starring", name: "Brenden Egan, Derek Poole Rob & Terry" },
      { role: "Directed", name: "Reece Daniels" },
      { role: "Produced", name: "Mason Kidd, Menny Son, Madi Wine" },
      { role: "Executive Producers", name: "Vlad Yudin, Edwin Mejia Jr." },
      { role: "Associate Producers", name: "Michael Schneider, Gus Chappory" },
      { role: "D.P.", name: "Matt Liang" },
      { role: "1st AD", name: "Madi Wine" },
      { role: "Editor", name: "Aashish Joshi" },
      { role: "Casting", name: "Peter Xiao" },
      { role: "Composer", name: "Evan LaFemina" },
      { role: "Steadicam", name: "Douglas Lau" },
      { role: "1st AC", name: "Irina Lazouski" },
      { role: "2nd AC", name: "Meagan theepisces" },
      { role: "Gaffer", name: "Steven Zambon" },
      { role: "Key Grip", name: "Ben Cruz" },
      { role: "Grips", name: "Jonesy De Los Santos, Michael Monroe, Patrice Yip" },
      { role: "Sound Mixer", name: "Evan LaFemina" },
      { role: "Boom Op", name: "Ryan Kelly" },
      { role: "Production Designer", name: "Menny Son" },
      { role: "Hair & Makeup", name: "Kennedy Guest" },
      { role: "Script Supervisor", name: "Cameron Paradiso" },
      { role: "Stunt Coordinator", name: "Ian Dugan" },
      { role: "BTS Photography", name: "Mason Kidd" },
      { role: "Production Assistants", name: "Aashish Joshi, Peter Xiao" },
      { role: "Post-Production Supervisor", name: "Aashish Joshi" },
      { role: "Colorist", name: "Ben Cerauli" },
      { role: "Supervising Sound Editor", name: "Jenna Tresidder" },
      { role: "Re-Recording Mixer", name: "Jared Obrien" },
      { role: "Dialogue Editor", name: "Jazz Gaudet" },
      { role: "Foley Artist", name: "Villiam Williams" },
      { role: "Assistant Sound Editor", name: "David J. Harding" },
    ],
  },
  {
    id: 12,
    title: "Call me a Liar - Dola",
    type: "MUSIC VIDEO",
    thumbnailUrl:
      "https://placehold.co/400x225/AAAAAA/dddddd?text=Call+me+a+Liar+Thumb",
    gifUrl:
      "https://placehold.co/400x225/AAAAAA/dddddd/gif?text=Call+me+a+Liar+GIF",
    vimeoId: undefined, // No Vimeo link provided
    vimeoHash: undefined,
    crew: [
      { role: "Starring", name: "Jordan Wynn" },
      { role: "Directors", name: "Reece Daniels & Jivensley Alexis" },
      { role: "Production Company", name: "Kairon Pictures" },
      { role: "Producer", name: "Alexandria Hellman" },
      { role: "Unit Production Manager", name: "Ian Janowsky" },
      { role: "1st AD", name: "Rebekah Strauss" },
      { role: "D.P.", name: "Matt Liang" },
      { role: "1st AC", name: "Kyle Farscht" },
      { role: "2nd AC", name: "Tristan Mogari" },
      { role: "Gaffer", name: "Julian Aguero / Marat" },
      { role: "Key Grip", name: "David Augusty" },
      { role: "Swing", name: "William Dangerfield" },
      { role: "Production Designer", name: "Jon Schatzberg" },
      { role: "Art Assistant", name: "Jeffrey Mallo" },
      { role: "Hair & Makeup", name: "Alexandra Rutkay" },
      { role: "Catering", name: "Grassfed Market" },
      { role: "VFX", name: "Shortcut Creatives" },
      { role: "Editor", name: "Reece Daniels" },
      { role: "Color", name: "Jeffrey Chance" },
    ],
  },
  {
    id: 13,
    title: "Pacer Test - Alana Markel",
    type: "MUSIC VIDEO",
    thumbnailUrl:
      "https://placehold.co/400x225/EEEEEE/BBBBBB?text=Pacer+Test+Thumb",
    gifUrl:
      "https://placehold.co/400x225/EEEEEE/BBBBBB/gif?text=Pacer+Test+GIF",
    vimeoId: undefined, // No Vimeo link provided
    vimeoHash: undefined,
    crew: [{ role: "Directed", name: "Eámonn Wrightstone" }],
  },
];
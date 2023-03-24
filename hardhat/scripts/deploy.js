// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  const [owner, user1, user2, user3] = await ethers.getSigners();

  const NewsContract = await ethers.getContractFactory("News");

  const newsContract = await NewsContract.connect(owner).deploy();

  await newsContract.deployed();

  console.log("News Dapp contract address : ", newsContract.address);

  // add articles
  console.log("adding 10 articles");
  let tx = await newsContract
    .connect(user1)
    .postArticle(
      '"Will Speak In Parliament If They Let Me": Rahul Gandhi To NDTV',
      'New Delhi: Rahul Gandhi today denied giving any anti-India speech on his way to attending parliament, where the ruling BJP has repeatedly demanded his apology for his remarks in London raising concerns about the state of democracy in India."I didn\'t give any Anti India speech," Rahul Gandhi told NDTV. Asked whether he would respond to the BJP\'s allegation that he insulted the nation on foreign soil, the Congress MP said: "I will speak inside the House if they allow me to. "However, both houses of the parliament were adjourned for the day shortly after re-convening at 2 pm. Several Union Ministers have demanded that Mr Gandhi apologise to the nation for his speeches in the UK, seen to be critical of the government. "The person who speaks the most in this country, and targets the government day and night, says abroad that he does not have the freedom to speak in India,"Union Law Minister Kiren Rijiju told reporters',
      "World",
      "https://images.unsplash.com/photo-1667849521081-4f24c052653e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZGVsaGklMjBtb251bWVudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      { value: tokens(0.01) }
    );
  tx.wait();

  tx = await newsContract
    .connect(user2)
    .postArticle(
      "Result of North Andhra graduates constituency MLC poll likely to be delayed",
      "The declaration of the result of the North Andhra Graduates MLC constituency elections, for which counting was taken up at Swarna Bharati Indoor Stadium, Visakhapatnam, on Thursday, is likely to be delayed. According to officials, the counting process will take over 12 hours. Besides, the AP High Court, following a petition by a contestant, in its order, stated that the result announcement would be subject to its final verdict. Owing to the two factors, the North Andhra MLC elections result may be announced late at night or on Friday upon counting votes in Visakhapatnam. The counting is being taken up in two phases with the participation of two teams. As many as 37 candidates are in the fray and the main contest is only among four candidates- PVN Madhav of BJP, S Sudhakar of YSRCP, V Chiranjeevi Rao of TDP and Ramaprabha of PDF. The YSRCP has fielded the candidate in the constituency for the first time after the party’s inception while MLC Madhav is presently representing the constituency. Taking the election as a prestigious one, the main parties campaigned vigorously for their candidates’ victory. The opposition parties accused the ruling party of indulging in irregularities like the distribution of money and registration of bogus votes. Over two lakh graduates cast their vote during the MLC elections in the constituency spreading over six districts (Srikakulam, Manyam, Vizianagaram, Alluri Sitharama Raju, Visakhapatnam, and Anakapalli).",
      "Politics",
      "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dm90aW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      { value: tokens(0.01) }
    );
  tx.wait();

  tx = await newsContract
    .connect(user1)
    .postArticle(
      "LinkedIn Adds AI-Generated Profile Summaries and Job Listings",
      "As a Microsoft-owned company, it’s no surprise to see LinkedIn looking to add more AI elements into its platform, with Microsoft now seeking to integrate OpenAI’s conversational GPT back-end into virtually all of its apps and functions. On LinkedIn, that’ll provide new options for creating your LinkedIn profile, while it’s also adding AI-generated job descriptions, as well as new educational opportunities into AI tech, via LinkedIn Learning. First off, LinkedIn’s adding a new GPT-powered tool that will provide personalized writing suggestions for creating your LinkedIn profile. As you can see in this example, a new feature within LinkedIn Premium will be the option to generate a headline or ‘About’ summary for your LinkedIn presence.Tap on the ‘Start’ button, select what you want it to create, and the system will come up with your LinkedIn profile summary, based on your info, and samples from millions of user entries. Or LinkedIn summaries could all start to look much the same. The risk with replicating content based on existing examples is that everything starts to feel very similar, and as more content is generated by AI over time, then fed into these tools to generate even more content, everything could, eventually, seem like a copy of a copy of a copy. Faded, a shadow of the original. Lacking life or personality. We’re not at that level as yet, and excitement around the latest version of the GPT model is high right now, but there is a risk that automated material will be restricted by what’s come before, which will make originality more attention-grabbing. In that context, maybe you’re better writing off your own LinkedIn summary – but at the same time, many people have a lot of trouble coming up with good LinkedIn profile content, and this could be a valuable addition in this respect. LinkedIn’s also testing a new AI-powered job description tool, which will make it faster and easier to write job descriptions. ",
      "Technology",
      "https://images.unsplash.com/photo-1611944212129-29977ae1398c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGlua2VkJTIwaW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      {
        value: tokens(0.01),
      }
    );
  tx.wait();

  tx = await newsContract
    .connect(user1)
    .postArticle(
      "New Zealand: Magnitude 7.1 quake strikes Kermadec Islands, tsunami possible",
      "New Zealand earthquake: The quake was at a depth of 10 km. Hazardous tsunami waves are possible for coasts located within 300 kilometers of the epicenter. A magnitude 7.1 earthquake struck in Kermadec Islands region, located north of New Zealand, on Thursday morning, according to a USGS statement. Read more: US' 'increased' spying on Russia led to drone incident: Moscow to Pentagon. The quake was at a depth of 10 km. Hazardous tsunami waves are possible for coasts located within 300 kilometers of the epicenter, the agency says in a separate statement. There is no tsunami threat to Australia, the country’s Bureau of Meteorology said in a tweet.",
      "World",
      "https://images.unsplash.com/photo-1620960286480-e61a805f12e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZWFydGhxdWFrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",

      {
        value: tokens(0.01),
      }
    );
  tx.wait();

  tx = await newsContract
    .connect(user2)
    .postArticle(
      "‘Apocalyptic Conflict’: Attack On Russian Aircraft In Neutral Airspace Will Be Seen As Declaration Of War — Top Diplomat",
      "A deliberate attack on a Russian aircraft in neutral airspace would be an open declaration of war against a nuclear power. This was announced by Russian Ambassador to Washington Anatoly Antonov.“Some lawmakers’ calls go far beyond common sense,” he said, commenting on US Senator Lindsey Graham’s (from South Carolina) threats to shoot down Russian planes approaching US aircraft in international airspace. Earlier, the Russian Defense Ministry published a statement stating that there was no impact between the two aircraft (MQ-9 and Su-27) and that the Reaper drone maneuvered abruptly, losing control and crashing. The ministry added that the US drone was flying without transponders and entered airspace that the Russian government had designated as restricted following the start of their special military operations. “The Russian aircraft did not use onboard weapons, did not come into contact with the unmanned aerial vehicle, and returned safely to their home airfield,” the ministry explained. According to Ambassador Antonov, not the Russian pilots but US politicians are inciting the start of an apocalyptic conflict. We do not seek a conflict with nuclear power. We continue to maintain contacts, including through the Ministry of Defense, to prevent unintentional collisions. I would like American politicians to have the same attitude towards relations with Russia,” the ambassador emphasized. Ukraine became the world’s third largest arms importer after Qatar and India in 2022, because of Russia’s full-scale invasion last year, according to a recent report by the Stockholm International Peace Research Institute (SIPRI). The SIPRI report compares weapons sales globally between 2013–17 and 2018–22. It shows that Ukraine imported a few major arms from 1991 until the end of 2021. However, “as a result of military aid from the USA and many European states following the Russian invasion of Ukraine in February 2022, Ukraine became the 3rd biggest importer of major arms during 2022 (after Qatar and India) and the 14th biggest for 2018–22,” the report by SIPRI stated. The report noted that the deliveries to Ukraine were mainly second-hand items from existing stocks, including 228 artillery pieces, an estimated 5000 guided artillery rockets from the US, 280 tanks from Poland, and over 7000 anti-tank missiles from the UK.",
      "World",
      "https://images.unsplash.com/photo-1583133269464-b721db5345f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8amV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      {
        value: tokens(0.01),
      }
    );
  tx.wait();

  tx = await newsContract
    .connect(user2)
    .postArticle(
      "Chinese J-11 Fighters \‘Shoot Down’ Indian Mirage 2000 Jets In Viral CGI Video Before Rafale Joins The War",
      "The video, along with a caption describing a scenario where Indian Air Force launched an attack on China while Beijing was preoccupied with annexing Taiwan, is currently being shared on Weibo, a Chinese microblogging platform. The animated clip, created using computer-generated imagery (CGI), illustrates a fierce aerial battle between Chinese and Indian fighter jets over a snow-covered mountainous landscape. Chinese J-11 twin-engine fighter jets are shown in the footage downing Indian Air Force Mirage 2000 jets during the dogfight. One frame of the video also depicted an Indian MiG-21 aircraft, but it was swiftly shown being destroyed by a missile launched by a Chinese warplane. At a timestamp of 1 minute and 20 seconds in the video, the clip features a Chinese KJ-2000 AWACS (Airborne Warning and Control System) aircraft providing the People’s Liberation Army’s fighter jets with situational awareness and helping them identify hostile activities.",
      "World",
      "https://images.unsplash.com/photo-1583133269464-b721db5345f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8amV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      {
        value: tokens(0.01),
      }
    );
  tx.wait();

  tx = await newsContract
    .connect(user1)
    .postArticle(
      "Jeff Bezos Lost More Money Than Adani And Ambani Put Together: Report",
      "Jeff Bezos, the founder of the global online retailer Amazon, saw the biggest loss in wealth in terms of dollars in the past year, according to the 2023 M3M Hurun Global Rich List. The US billionaire lost more than Indian billionaires Mukesh Ambani and Gautam Adani combined, in the previous year. Jeff Bezos lost some $70 billion in personal wealth. Mukesh Ambani lost $21 billion, while Gautam Adani and his family lost $28 billion in personal wealth. Elon Musk, the CEO of Twitter, is ranked second on the list of the top wealth losers. He has a net worth of $157 billion, and his wealth has decreased by $48 billion. Mr. Musk also cofounded six companies, including electric car maker Tesla, rocket producer SpaceX, and tunneling startup Boring Company.Sergey Brin, the co-founder of Google, ranks third with a net worth of $72 billion; nevertheless, he lost $44 billion last year. With a wealth of $75 billion and a wealth change of $41 billion, Larry Page comes in fourth place. MacKenzie Scott faced a wealth change of $35 billion, which puts her in fifth position on the list. Gautam Adani and his family ranked sixth with a net worth of $53 billion and a wealth change of $28 billion. The Adani Group has business interests in ports, airports, power generation and transmission, green energy, and others.",
      "Business",
      "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YW1hem9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      {
        value: tokens(0.01),
      }
    );
  tx.wait();

  tx = await newsContract
    .connect(user1)
    .postArticle(
      "Coronavirus Live Updates: PM Modi chairs high-level meeting to review Covid situation, preparedness",
      "Covid News Live Updates: With cases of Covid-19 in the country rising once again, Prime Minister Narendra Modi is chairing a high-level meeting to review the situation and public health preparedness today. As per the Union Health ministry bulletin released on Wednesday morning, India recorded a single-day rise of 1,134 Covid cases, this year's highest so far. The active cases increased to 7,026. Stay with TOI for live updates -",
      "Health",
      "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29yb25hJTIwdmlydXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      {
        value: tokens(0.01),
      }
    );
  tx.wait();

  tx = await newsContract
    .connect(user2)
    .postArticle(
      "'Ran Down 11 Flights As Building Shook': People Rush Out Of Homes After Delhi Quake",
      "Earthquake: Local media in Pakistan also reported shocks in Islamabad, Lahore and Peshawar. New Delhi: A massive 6.5 magnitude earthquake which was felt across north India and neighbouring Pakistan on Tuesday evening sent residents of several Indian cities including Delhi rushing out of their homes. The tremors lasted two minutes with reports pinning the epicentre in the Hindu Kush region in Afghanistan. The epicenter was 40 kilometers south-southeast of the Afghan town of Jurm, near the borders with Pakistan and Tajikistan. People across Delhi and Noida rushed out of their homes at around 10 pm onto the street, with some carrying their children wrapped in blankets. Ghaziabad residents were also seen on the streets",
      "World",
      "https://images.unsplash.com/photo-1628951695439-4a6eeecbade9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHdhciUyMHBsYW5lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      { value: tokens(0.01) }
    );
  tx.wait();

  tx = await newsContract
    .connect(user3)
    .postArticle(
      "Supreme Court Collegium Recommends Elevating 4 Judges To Madras High Court",
      "The Supreme Court collegium recommended four new judges to Madras High Court New Delhi: The Supreme Court collegium has recommended to the centre the names of four district judges for appointment as judges of the Madras High Court. The four judges, whose names were recommended for elevation to the high court by the Supreme Court collegium for the first time, are R Sakthivel, P Dhanabal, Chinnasamy Kumparappan and K Rajasekar. The collegium also told the centre to notify the names of R John Sathyan and Ramaswamy Neelakandan, whose names were given in the collegium's previous recommendations in January this year, for appointment to the high court. The Supreme Court said the names who it has already recommended and reiterated should not be 'withheld or overlooked' as any delay disturbs the seniority of candidates. The Supreme Court collegium recommended four new judges to Madras High Court New Delhi: The Supreme Court collegium has recommended to the centre the names of four district judges for appointment as judges of the Madras High Court. The four judges, whose names were recommended for elevation to the high court by the Supreme Court collegium for the first time, are R Sakthivel, P Dhanabal, Chinnasamy Kumparappan and K Rajasekar. The collegium also told the centre to notify the names of R John Sathyan and Ramaswamy Neelakandan, whose names were given in the collegium's previous recommendations in January this year, for appointment to the high court. The Supreme Court said the names who it has already recommended and reiterated should not be 'withheld or overlooked' as any delay disturbs the seniority of candidates. 'The names which have been recommended earlier in point of time including the reiterated names ought not to be withheld or overlooked as this disturbs their seniority whereas those recommended later steal march on them. Loss of seniority of candidates recommended earlier in point of time has been noted by the collegium and is a matter of grave concern,' the collegium said in its communication to the centre. The centre is yet to clear the names of R John Sathyan and Ramaswamy Neelakandan. In the latest communication to the centre, the Supreme Court did not reiterate these two names as reiteration is possible only if their names are returned by the centre, which has neither returned nor notified these two names.",
      "Politics",
      "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1cHJlbWUlMjBjb3VydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      { value: tokens(0.01) }
    );
  tx.wait();

  console.log("Added 10 articles");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

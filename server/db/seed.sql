INSERT INTO usr (username, email, password, pic_url) VALUES ('slick150', '123@123.com', '12345678', 'https://xsgames.co/randomusers/assets/avatars/male/78.jpg');
INSERT INTO usr (username, email, password, pic_url) VALUES ('anabel', '123@123.com', '12345678', 'https://xsgames.co/randomusers/assets/avatars/female/36.jpg');
INSERT INTO usr (username, email, password, pic_url) VALUES ('outdoorsGuy', '123@123.com', '12345678', 'https://xsgames.co/randomusers/assets/avatars/male/76.jpg');

INSERT INTO brief (title, usr_id) VALUES ('4 Day Weekend', 1);
INSERT INTO brief (title, usr_id) VALUES ('Girls Scouts Hike', 2);
INSERT INTO brief (title, usr_id) VALUES ('Road Trip', 3);

INSERT INTO dont (cat, descr) VALUES ('Standard', 'Don''t drink and drive');
INSERT INTO dont (cat, descr) VALUES ('Standard', 'Don''t drive and text');
INSERT INTO dont (cat, descr) VALUES ('Standard', 'No means no, enough said');
INSERT INTO dont (cat, descr) VALUES ('Standard', 'Keep local emergency numbers handy');
INSERT INTO dont (cat, descr) VALUES ('Standard', 'Think before you post in social media');
INSERT INTO dont (cat, descr) VALUES ('Standard', 'Don''t let arguments with your significant other turn violent; walk away, cool off, and go somewhere else');
INSERT INTO dont (cat, descr) VALUES ('Standard', 'If you frequent places showcasing good looking people taking donations for their college education, do''t touch the mercahndise');

INSERT INTO dont (cat, descr) VALUES ('Long Driving Trip', 'Don''t make a long drive in one stretch; take frequent breaks');
INSERT INTO dont (cat, descr) VALUES ('Long Driving Trip', 'Don''t start a long drive after a full day of work');
INSERT INTO dont (cat, descr) VALUES ('Long Driving Trip', 'Sleep well before a long drive');
INSERT INTO dont (cat, descr) VALUES ('Long Driving Trip', 'Avoid taking long drives alone; take turns driving');
INSERT INTO dont (cat, descr) VALUES ('Long Driving Trip', 'Listen to the radio, audio book or podcast during long drives to say alert');
INSERT INTO dont (cat, descr) VALUES ('Long Driving Trip', 'Bring snacks, they can boost your energy while causing little distraction on long drives');
INSERT INTO dont (cat, descr) VALUES ('Long Driving Trip', 'Use a GPS on long drives');
INSERT INTO dont (cat, descr) VALUES ('Long Driving Trip', 'Make sure the vehicle is fit for the trip before long drives');
INSERT INTO dont (cat, descr) VALUES ('Long Driving Trip', 'Bring a roadside safety kit on long drives');
INSERT INTO dont (cat, descr) VALUES ('Long Driving Trip', 'Check the weather often during long drives');
INSERT INTO dont (cat, descr) VALUES ('Long Driving Trip', 'Avoid Driving at night during long drives');

INSERT INTO dont (cat, descr) VALUES ('Water Sports', 'Don''t go boating or swiming while intoxicated');
INSERT INTO dont (cat, descr) VALUES ('Water Sports', 'Always test the water depth before diving');
INSERT INTO dont (cat, descr) VALUES ('Water Sports', 'Apply sunscreen every two hours');
INSERT INTO dont (cat, descr) VALUES ('Water Sports', 'Always wear a lifejacket when conducting water sports');
INSERT INTO dont (cat, descr) VALUES ('Water Sports', 'Always attach the engine cutoff lanyard when jet skiing');

INSERT INTO dont (cat, descr) VALUES ('Hiking', 'Let someone know where you are going and when you are returning');
INSERT INTO dont (cat, descr) VALUES ('Hiking', 'Check the weather forecast often during hikes');
INSERT INTO dont (cat, descr) VALUES ('Hiking', 'Plan to have limited or no cell phone coverage in remote areas');
INSERT INTO dont (cat, descr) VALUES ('Hiking', 'Hike with a buddy');
INSERT INTO dont (cat, descr) VALUES ('Hiking', 'Don''t mess with the wildlife, that includes selfies with bears!');
INSERT INTO dont (cat, descr) VALUES ('Hiking', 'Wear layers, proper shoes, and take extra water and food');
INSERT INTO dont (cat, descr) VALUES ('Hiking', 'Take a picture of the trail map when available');

INSERT INTO dont (cat, descr) VALUES ('BBQ', 'Keep a fire extinguisher handy when barbecuing');
INSERT INTO dont (cat, descr) VALUES ('BBQ', 'Don''t wear loose clothes or clothes with long sleves near flames');
INSERT INTO dont (cat, descr) VALUES ('BBQ', 'Place BBQ grill in well-ventilated areas and away from children''s play areas');
INSERT INTO dont (cat, descr) VALUES ('BBQ', 'Never use gasoline to start a BBQ or campfire');
INSERT INTO dont (cat, descr) VALUES ('BBQ', 'BBQ grills are meand for outdoor use only');
INSERT INTO dont (cat, descr) VALUES ('BBQ', 'Ensure charcoal is cool and completely out before disposing');

INSERT INTO dont (cat, descr) VALUES ('Cold Weather', 'Never try to heat your home with a stove, oven, or grill since these give off carbon monoxide (poison)');
INSERT INTO dont (cat, descr) VALUES ('Cold Weather', 'Even though its cold, stay hydrated');
INSERT INTO dont (cat, descr) VALUES ('Cold Weather', 'Never plug heaters into an extension cord; always plug into a receptacle');
INSERT INTO dont (cat, descr) VALUES ('Cold Weather', 'Strenuous activity out in the cold can increase the risk of heart attack; this includes shoveling snow');
INSERT INTO dont (cat, descr) VALUES ('Cold Weather', 'Limit time outside in windy, wet, or extremely cold weather');
INSERT INTO dont (cat, descr) VALUES ('Cold Weather', 'Winterize your car; keep your gas tank half-full to prevent frozen lines and keep extra batteries, flashlights, blankets and a first aid kit');

INSERT INTO dont (cat, descr) VALUES ('Hot Weather', 'Avoid exercising during the hottest part of the day');
INSERT INTO dont (cat, descr) VALUES ('Hot Weather', 'Wear light, loose clothing, a hat, and use sunscreen to avoid heat injuries');
INSERT INTO dont (cat, descr) VALUES ('Hot Weather', 'Know your limits when it comes to activity in excessive hot weather');
INSERT INTO dont (cat, descr) VALUES ('Hot Weather', 'Stay hydrated during hot weather; beer does not count!');

INSERT INTO brief_dont (brief_id, dont_id) VALUES (1, 1);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (1, 2);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (1, 3);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (1, 4);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (1, 5);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (1, 6);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (1, 7);

INSERT INTO brief_dont (brief_id, dont_id) VALUES (2, 24);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (2, 25);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (2, 26);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (2, 27);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (2, 28);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (2, 29);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (2, 30);

INSERT INTO brief_dont (brief_id, dont_id) VALUES (3, 8);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (3, 9);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (3, 10);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (3, 11);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (3, 12);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (3, 13);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (3, 14);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (3, 15);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (3, 16);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (3, 17);
INSERT INTO brief_dont (brief_id, dont_id) VALUES (3, 18);

INSERT INTO fave (usr_id, dont_id) VALUES (1, 1);
INSERT INTO fave (usr_id, dont_id) VALUES (1, 7);
INSERT INTO fave (usr_id, dont_id) VALUES (2, 24);
INSERT INTO fave (usr_id, dont_id) VALUES (2, 28);
INSERT INTO fave (usr_id, dont_id) VALUES (2, 30);
INSERT INTO fave (usr_id, dont_id) VALUES (3, 12);
INSERT INTO fave (usr_id, dont_id) VALUES (3, 13);
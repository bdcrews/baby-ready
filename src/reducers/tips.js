import {
    SET_TIPS_INDEX
} from '../actions/tips';

const tips = [
        {title: "Take a Prenatal Vitamin", text: "Even when you're still trying to conceive, it's smart to start taking prenatal vitamins. Your baby's neural cord, which becomes the brain and spinal cord, develops within the first month of pregnancy, so it's important you get essential nutrients, like folic acid, calcium, and iron, from the very start. Prenatal vitamins are available over the counter at most drug stores, or you can get them by prescription from your doctor. If taking them makes you feel queasy, try taking them at night or with a light snack. Chewing gum or sucking on hard candy afterward can help, too."},
        {title: "Exercise", text: "Staying active is a must for most moms to be. Regular exercise will help you control your weight, improve circulation, boost your mood, and help you sleep better. Plus, getting into an exercise habit now will help you set a good example for your child after she's born.  Pilates, yoga, swimming, and walking are all great activities for most pregnant women, but be sure to check with your doctor first before starting any exercise program. Aim for 30 minutes of exercise most days of the week. Listen to your body, though, and don't overdo it."},
        {title: "Write a Birth Plan", text: "Determined to have a doula? Counting on that epidural? Write down your wishes and give a copy to everyone involved with the delivery. According to the American Pregnancy Association, here are some things to consider when writing your birth plan: Who you want present, including children or siblings of the baby? Procedures you want to avoid? What positions you prefer for labor and delivery? Special clothing you'd like to wear? Whether you want music or a special focal point? Whether you want pain medications, and what kind? What to do if complications arise?"},
        {title: "Educate Yourself", text: "Even if this isn't your first baby, attending a childbirth class will help you feel more prepared for delivery. Not only will you have the chance to learn more about childbirth and infant care, but you can ask specific questions and voice any concerns. You'll also become more acquainted with the facility and its staff. Now is also a good time to brush up on your family's medical history. Talk to your doctor about problems with past pregnancies, and report any family incidences of birth defects."},
        {title: "Practice Kegels", text: "Kegels strengthen the pelvic floor muscles, which support your bladder, bowels, and uterus. Done correctly, this simple exercise can help make your delivery easier and prevent problems later with incontinence. The best part: No one can tell you're doing them, so you can practice kegels in the car, while you're sitting at your desk, or even standing in line at the grocery store. Here's how to do them right: Practice squeezing as though you're stopping the flow of urine when you use the bathroom. Hold for three seconds, then relax for three. Repeat 10 times."},
        {title: "Change Up Chores", text: "Even everyday tasks like scrubbing the bathroom or cleaning up after pets can become risky when you're pregnant. Exposure to toxic chemicals, lifting heavy objects, or coming in contact with bacteria can harm you and your baby. Here are some things to (hooray!) take off your to-do-list: Heavy lifting, Climbing on stepstools or ladders, Changing kitty litter (to avoid toxoplasmosis, a disease caused by a parasite which cats can carry), Using harsh chemicals, Standing for long periods of time, especially near a hot stove.  Also, wear gloves if you're working in the yard where cats may have been, and wash your hands thoroughly after handling raw meat."},
        {title: "Track Your Weight Gain", text: "We know -- you're eating for two. But packing on too many extra pounds may make them hard to lose later. At the same time, not can gaining enough weight can put the baby at risk for a low-weight birth, a major cause of developmental problems. Recently the Institute of Medicine (IOM) issued new guidelines for weight gain during pregnancy. Here's what the IOM recommends, based on a woman's BMI (body mass index) before becoming pregnant with one baby: Underweight: Gain 28-40 pounds, Normal weight: Gain 25-35 pounds, Overweight: Gain 15-25 pounds, Obese: Gain 11-20 pounds.  Check in with your doctor frequently to make sure you're gaining at a healthy rate."},
        {title: "Go Shoe Shopping", text: "At last -- a perfect excuse to buy shoes! As your bump grows, so may your feet -- or at least they may feel like they are. That's because your natural weight gain throws off your center of gravity, putting extra pressure on your tootsies. Over time this added pressure can cause painful over-pronation, or flattening out of the feet. You may retain fluids, too, which can make your feet and ankles swell. To prevent these problems, wear comfy shoes with good support. Many expectant moms find they need a larger shoe size even after they give birth, so go a step up if you need to."},
        {title: "Rethink Your Spa Style", text: "Pregnancy is definitely a time for pampering, but you need to be careful. Avoid saunas, which can make you overheated. Ditto for hot tubs: According to the American Pregnancy Association, it takes only 10 to 20 minutes of sitting in one for your body temperature to reach 102 degrees Farenheit -- nearly the limit of what's considered safe for pregnant women. Also, certain essential oils can cause uterine contractions, especially during the first and second trimester, so check with your massage therapist to make sure only safe ones are being used. On the taboo list: juniper, rosemary, and clary sage."},
        {title: "Eat Folate-Rich Foods", text: "\"Folic acid is crucial for the proper development of the baby's neural tube (it covers the spinal cord), and it's vital for the creation of new red blood cells,\" says Frances Largeman-Roth, R.D., author of the new book Feed the Belly. Even before you find out you're pregnant, it's smart to start eating plenty of folate-rich foods like fortified cereals, asparagus, lentils, wheat germ, oranges, and orange juice."},
        {title: "Recharge with Fruit", text: "Most doctors recommend limiting caffeine during pregnancy, since it can have harmful effects on you and the baby. Cutting back can be tough, though -- especially when you're used to your morning java. For a quick pick-me-up, try nibbling on some fruit. \"The natural sugars in fruits like bananas and apples can help lift energy levels,\" says registered dietitian Frances Largeman-Roth."},
        {title: "Go Fish", text: "In a 2007 study of more than 12,000 children, researchers found that youngsters whose moms ate the most fish during pregnancy had higher I.Q.s, plus better motor and communication skills, than those whose mothers did not eat fish. Scientists say that's because fish is high in omega 3s, a nutrient critical to brain development. There's just one catch: Some kinds of fish contain mercury, which can be toxic to both babies and adults.  To be safe, the FDA recommends that pregnant women eat no more than 12 ounces of fish per week. Stick with canned light tuna, shrimp, salmon, pollack, or catfish. Avoid swordfish, shark, king mackerel, and tilefish, which are all high in mercury."},
        {title: "Wear Sunscreen", text: "Being pregnant makes your skin more sensitive to sunlight, so you're more prone to sunburn and chloasma, those dark, blotchy spots that sometimes appear on the face. Apply a sunscreen with an SPF of 30 or higher (many brands now offer chemical-free formulas, if you prefer a green option) and wear a hat and sunglasses. While no studies prove spending time in tanning beds can hurt your baby, the American Pregnancy Association recommends you avoid them while you're pregnant."},
        {title: "Fly Smart", text: "Go ahead -- book that flight, but take some precautions. Experts from the Mayo Clinic say mid-pregnancy, around 14 to 28 weeks, is usually the best time to fly -- by this time you're probably over morning sickness, and the risk of miscarriage or early delivery is low. Still, check with your doctor about any travel plans, and make sure the airline has no restrictions for pregnant women. On the plane, drink plenty of water to stay hydrated, and get up and walk around every half hour to reduce the risk of blood clots. An aisle seat will give you more room and make trips to the bathroom easier."},
        {title: "Say Yes to Cravings -- Sometimes", text: "Truth be told, no one knows why cravings happen. Some experts say they may be nature's way of providing nutrients an expectant mom may be lacking. Others say they're an emotional thing. Regardless, as long as you're eating an overall healthy diet, it's usually OK to give in to your cravings. Just be careful to limit portions -- don't down all that ice cream at once! -- and know which snacks to steer clear of. A few foods to avoid: raw and undercooked meat or eggs; brie, feta, and other types of unpasteurized cheese; herbal teas; and raw sprouts."},
        {title: "Know When to Call the Doctor", text: "Being pregnant can be confusing, especially if it's your first time. How do you know which twinge is normal and which one isn't? According to the Centers for Disease Control and Prevention, you should call your doctor if you have any of these symptoms: Pain of any kind, Strong cramps, Contractions at 20-minute intervals, Vaginal bleeding or leaking of fluid, Dizziness or fainting, Shortness of breath, Heart palpitations, Constant nausea and vomiting, Trouble walking, edema (swelling of joints), Decreased activity by the baby"},
        {title: "Indulge Yourself", text: "You may think you're busy now, but once the baby comes you'll have even fewer precious moments to yourself. Treating yourself to a lunchtime manicure, spending a much-needed night out with the girls, or simply taking a quiet walk can help you relax and de-stress -- and that's good for both you and the baby."}
    ];

const initialState = {
    tipIndex: Math.floor(Math.random() * tips.length),
    tips: tips
};

export default function reducer(state = initialState, action) {
        
    if (action.type === SET_TIPS_INDEX) {
        return Object.assign({}, state, {
            tipIndex: (action.tipIndex + state.tips.length) % state.tips.length
        });
    }
    return state;
}
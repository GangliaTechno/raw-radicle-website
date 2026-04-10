
import json
import os

products_file = 'products.json'

with open(products_file, 'r', encoding='utf-8') as f:
    products = json.load(f)

# Migration Data
migration_data = {
    "adarkc": [
        {"id": "ad1", "author": "Priya S.", "rating": 5, "comment": "Absolutely love this! The dark chocolate with Ashwagandha is a perfect evening ritual. I feel calmer before bed and the taste is rich without being too bitter.", "date": "3/15/2026", "verified": True},
        {"id": "ad2", "author": "Arjun M.", "rating": 5, "comment": "As someone who takes Ashwagandha supplements daily, this is a game-changer. Getting my adaptogens through premium dark chocolate? Yes please.", "date": "2/28/2026", "verified": True},
        {"id": "ad3", "author": "Kavitha R.", "rating": 4, "comment": "Really nice product overall. The chocolate quality is clearly premium and you can taste the difference. The wellness benefits make it absolutely worth it.", "date": "2/10/2026", "verified": True}
    ],
    "amilkc": [
        {"id": "am1", "author": "Sneha D.", "rating": 5, "comment": "This milk chocolate version is incredibly smooth. My kids love it too and I feel good knowing they are getting the benefits of Ashwagandha.", "date": "3/20/2026", "verified": True},
        {"id": "am2", "author": "Rahul K.", "rating": 5, "comment": "I bought this as a gift for my wife and she absolutely loved it. The milk chocolate base makes the Ashwagandha very approachable. Already reordered twice!", "date": "3/5/2026", "verified": True},
        {"id": "am3", "author": "Meera J.", "rating": 4, "comment": "Lovely chocolate with a purpose. I have been eating a square daily after lunch and my afternoon stress levels have noticeably improved.", "date": "2/18/2026", "verified": True}
    ],
    "bdarkc": [
        {"id": "bd1", "author": "Vikram T.", "rating": 5, "comment": "The Brahmi-infused dark chocolate is my new study companion. I genuinely feel more focused after having a square. The flavor profile is sophisticated.", "date": "3/18/2026", "verified": True},
        {"id": "bd2", "author": "Ananya P.", "rating": 5, "comment": "As a software developer, I need sustained focus. This chocolate has become my afternoon brain-booster. The 55% dark cocoa base pairs beautifully with the herbal notes.", "date": "3/1/2026", "verified": True},
        {"id": "bd3", "author": "Deepak N.", "rating": 4, "comment": "Interesting concept and solid execution. The chocolate itself is excellent quality. The Brahmi benefits are a nice bonus on top of a genuinely delicious treat.", "date": "2/14/2026", "verified": True}
    ],
    "bmilkc": [
        {"id": "bm1", "author": "Lakshmi V.", "rating": 5, "comment": "The creamiest functional chocolate I have ever tried. The milk chocolate base is heavenly and you barely notice the Brahmi. It just works silently.", "date": "3/22/2026", "verified": True},
        {"id": "bm2", "author": "Sanjay G.", "rating": 5, "comment": "Ordered the Brahmi Milk for my elderly parents. They love it! The smooth texture is easy on their palate and the cognitive benefits are exactly what they need.", "date": "3/8/2026", "verified": True},
        {"id": "bm3", "author": "Ritu A.", "rating": 4, "comment": "Very impressed with the quality. The ghrita preparation method for the Brahmi infusion is authentic Ayurveda. Tastes like premium chocolate, works like a supplement.", "date": "2/22/2026", "verified": True}
    ],
    "cdarkc": [
        {"id": "cd1", "author": "Pooja M.", "rating": 5, "comment": "The perfect fusion of ancient wisdom and modern indulgence. The dark chocolate perfectly masks the traditional flavors while preserving all the benefits.", "date": "3/12/2026", "verified": True},
        {"id": "cd2", "author": "Nikhil S.", "rating": 4, "comment": "Great product and innovative concept. The 55% dark cocoa base has a robust flavor that complements the herbal formulation well. Would love a sugar-free version too.", "date": "2/25/2026", "verified": True}
    ],
    "cmilkc": [
        {"id": "cm1", "author": "Karthik H.", "rating": 5, "comment": "Bought this for monsoon season immunity prep. The milk chocolate is silky smooth and you get all 38+ herbs of traditional Chyawanaprash in every bite.", "date": "3/10/2026", "verified": True},
        {"id": "cm2", "author": "Swati R.", "rating": 4, "comment": "Really enjoyable chocolate. The Chyawanaprash infusion is well-balanced, not overpowering at all. My only suggestion is to offer a larger bar size.", "date": "2/20/2026", "verified": True}
    ]
}

# Update products with migration data
for pid, reviews in migration_data.items():
    if pid in products:
        products[pid]['reviews'] = reviews

with open(products_file, 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2)

print("Migration complete.")

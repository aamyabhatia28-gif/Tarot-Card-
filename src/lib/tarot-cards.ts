export interface TarotCard {
  id: string;
  name: string;
  arcana: "major" | "minor";
  suit?: "wands" | "cups" | "swords" | "pentacles";
  number: string;
  symbol: string;
  gradient: [string, string];
  keywords: string[];
  meaning: string;
}

const SUIT_SYMBOLS = {
  wands: "✺",
  cups: "◈",
  swords: "✦",
  pentacles: "⬡",
};

const SUIT_GRADIENTS: Record<string, [string, string]> = {
  wands: ["#7b1f1f", "#c0392b"],
  cups: ["#0d2d5e", "#1a5276"],
  swords: ["#1c1c2e", "#4a4a8a"],
  pentacles: ["#0f3b1f", "#1e6b36"],
};

export const majorArcana: TarotCard[] = [
  { id: "major-0", name: "The Fool", arcana: "major", number: "0", symbol: "✦", gradient: ["#2c1654", "#6a0dad"], keywords: ["beginnings", "innocence", "adventure", "potential"], meaning: "New beginnings, spontaneity, and a leap of faith into the unknown. Pure potential awaits." },
  { id: "major-1", name: "The Magician", arcana: "major", number: "I", symbol: "∞", gradient: ["#4a0d0d", "#991b1b"], keywords: ["willpower", "manifestation", "skill", "resourcefulness"], meaning: "You have all the tools you need. Manifestation, focused will, and the power to turn thought into reality." },
  { id: "major-2", name: "The High Priestess", arcana: "major", number: "II", symbol: "☽", gradient: ["#0d1b4a", "#1a3a6e"], keywords: ["intuition", "mystery", "inner knowledge", "patience"], meaning: "Trust your intuition. Hidden knowledge and divine feminine wisdom wait beneath the surface." },
  { id: "major-3", name: "The Empress", arcana: "major", number: "III", symbol: "♀", gradient: ["#2d4a0d", "#4a7c1b"], keywords: ["abundance", "fertility", "nurturing", "nature"], meaning: "Abundance, creativity, and nurturing energy. A time of growth, beauty, and fruitfulness." },
  { id: "major-4", name: "The Emperor", arcana: "major", number: "IV", symbol: "♦", gradient: ["#4a2d0d", "#8b4513"], keywords: ["authority", "structure", "stability", "leadership"], meaning: "Order, authority, and stable foundations. Time to take charge and establish lasting structure." },
  { id: "major-5", name: "The Hierophant", arcana: "major", number: "V", symbol: "✝", gradient: ["#2d0d4a", "#5b1e91"], keywords: ["tradition", "guidance", "spirituality", "institutions"], meaning: "Spiritual wisdom, tradition, and seeking guidance. A mentor or established path may hold the answer." },
  { id: "major-6", name: "The Lovers", arcana: "major", number: "VI", symbol: "♥", gradient: ["#4a0d2d", "#9b1a5e"], keywords: ["love", "harmony", "choices", "alignment"], meaning: "Deep connection, meaningful choices, and alignment of values. The heart must choose its true path." },
  { id: "major-7", name: "The Chariot", arcana: "major", number: "VII", symbol: "◈", gradient: ["#0d2d4a", "#1a5e7a"], keywords: ["control", "willpower", "victory", "determination"], meaning: "Victory through discipline and willpower. Harness opposing forces and drive forward with conviction." },
  { id: "major-8", name: "Strength", arcana: "major", number: "VIII", symbol: "∞", gradient: ["#4a2d0d", "#cc7700"], keywords: ["courage", "inner strength", "patience", "compassion"], meaning: "Inner courage, gentle persistence, and quiet power. True strength comes from compassion, not force." },
  { id: "major-9", name: "The Hermit", arcana: "major", number: "IX", symbol: "✧", gradient: ["#1a1a2e", "#2d2d4a"], keywords: ["introspection", "solitude", "guidance", "soul-searching"], meaning: "Step back and seek wisdom within. Solitude and introspection light the path forward." },
  { id: "major-10", name: "Wheel of Fortune", arcana: "major", number: "X", symbol: "⊙", gradient: ["#2d1b00", "#7b4a00"], keywords: ["cycles", "fate", "turning point", "luck"], meaning: "The wheel turns. A significant change or turning point arrives — embrace the cycles of life." },
  { id: "major-11", name: "Justice", arcana: "major", number: "XI", symbol: "⚖", gradient: ["#0d3d3d", "#006060"], keywords: ["fairness", "truth", "cause and effect", "clarity"], meaning: "Truth, fairness, and the law of cause and effect. What is just will prevail; honest decisions are needed." },
  { id: "major-12", name: "The Hanged Man", arcana: "major", number: "XII", symbol: "ψ", gradient: ["#1e3a1e", "#2d5a2d"], keywords: ["pause", "surrender", "new perspective", "enlightenment"], meaning: "Pause and surrender control. A new perspective gained by releasing resistance brings unexpected wisdom." },
  { id: "major-13", name: "Death", arcana: "major", number: "XIII", symbol: "✸", gradient: ["#1a0a1a", "#3d0d3d"], keywords: ["endings", "transformation", "transition", "renewal"], meaning: "Not literal death, but profound transformation. One chapter closes so something beautiful can begin." },
  { id: "major-14", name: "Temperance", arcana: "major", number: "XIV", symbol: "≋", gradient: ["#0d2040", "#1a3d6e"], keywords: ["balance", "patience", "moderation", "flow"], meaning: "Balance, patience, and divine flow. Blend opposing energies with grace and let things unfold naturally." },
  { id: "major-15", name: "The Devil", arcana: "major", number: "XV", symbol: "◆", gradient: ["#1a0000", "#3d0000"], keywords: ["bondage", "materialism", "shadow self", "attachment"], meaning: "Examine what holds you captive. The chains of attachment can be broken — awareness is the first step." },
  { id: "major-16", name: "The Tower", arcana: "major", number: "XVI", symbol: "⚡", gradient: ["#2d1500", "#6b3000"], keywords: ["upheaval", "chaos", "revelation", "liberation"], meaning: "Sudden disruption that clears the way for truth. What crumbles was built on false foundations." },
  { id: "major-17", name: "The Star", arcana: "major", number: "XVII", symbol: "★", gradient: ["#001a3d", "#003380"], keywords: ["hope", "healing", "serenity", "inspiration"], meaning: "Hope, renewal, and cosmic guidance. After darkness comes the light — have faith in what is possible." },
  { id: "major-18", name: "The Moon", arcana: "major", number: "XVIII", symbol: "☾", gradient: ["#0a0a1a", "#1a1a40"], keywords: ["illusion", "fear", "subconscious", "intuition"], meaning: "The subconscious speaks. Look beneath illusions and fears to find what is truly real." },
  { id: "major-19", name: "The Sun", arcana: "major", number: "XIX", symbol: "☀", gradient: ["#4a3000", "#996600"], keywords: ["joy", "success", "vitality", "clarity"], meaning: "Radiant joy, success, and life-giving clarity. The light shines on you — celebrate and embrace abundance." },
  { id: "major-20", name: "Judgement", arcana: "major", number: "XX", symbol: "♩", gradient: ["#1a0a2d", "#3d1a69"], keywords: ["reflection", "absolution", "awakening", "reckoning"], meaning: "A profound awakening and call to rise. Reflect honestly, release the past, and answer your higher calling." },
  { id: "major-21", name: "The World", arcana: "major", number: "XXI", symbol: "⊕", gradient: ["#001a1a", "#004040"], keywords: ["completion", "integration", "wholeness", "achievement"], meaning: "Completion, wholeness, and the fulfillment of a cycle. You have arrived — celebrate what has been mastered." },
];

function makeMinorCard(
  suit: "wands" | "cups" | "swords" | "pentacles",
  number: string,
  label: string,
  keywords: string[],
  meaning: string
): TarotCard {
  return {
    id: `${suit}-${label.toLowerCase().replace(/\s/g, "-")}`,
    name: `${label} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
    arcana: "minor",
    suit,
    number,
    symbol: SUIT_SYMBOLS[suit],
    gradient: SUIT_GRADIENTS[suit],
    keywords,
    meaning,
  };
}

const wandsCards: TarotCard[] = [
  makeMinorCard("wands", "A", "Ace", ["inspiration", "new passion", "creation"], "A spark of inspiration and creative fire. A bold new beginning filled with passion and potential."),
  makeMinorCard("wands", "2", "Two", ["planning", "vision", "future"], "Bold vision and planning for the future. Stand tall and survey the possibilities before you."),
  makeMinorCard("wands", "3", "Three", ["expansion", "foresight", "enterprise"], "Your plans are gaining momentum. Look ahead and prepare to expand your horizons."),
  makeMinorCard("wands", "4", "Four", ["celebration", "harmony", "homecoming"], "A moment of celebration and joyful community. Pause and appreciate all you have built."),
  makeMinorCard("wands", "5", "Five", ["conflict", "competition", "tension"], "Competing ideas and necessary friction. Growth emerges through healthy challenge and debate."),
  makeMinorCard("wands", "6", "Six", ["victory", "recognition", "progress"], "Public recognition and the sweet taste of victory. Your efforts are bearing fruit."),
  makeMinorCard("wands", "7", "Seven", ["perseverance", "challenge", "conviction"], "Hold your ground with courage. Others may challenge you, but your position is defensible."),
  makeMinorCard("wands", "8", "Eight", ["speed", "swift action", "momentum"], "Everything is moving fast. Messages, opportunities, and events arrive with rapid momentum."),
  makeMinorCard("wands", "9", "Nine", ["resilience", "persistence", "caution"], "You've come far but stay guarded. Draw on your resilience — the finish line is within reach."),
  makeMinorCard("wands", "10", "Ten", ["burden", "responsibility", "pressure"], "Heavy responsibilities weigh on you. Consider what you can delegate or release."),
  makeMinorCard("wands", "P", "Page", ["enthusiasm", "curiosity", "new ideas"], "Youthful fire and eager exploration. A message or new idea sparks excitement and curiosity."),
  makeMinorCard("wands", "Kn", "Knight", ["energy", "passion", "adventure"], "Bold, passionate action. Charge forward with confidence but avoid recklessness."),
  makeMinorCard("wands", "Q", "Queen", ["confidence", "independence", "vibrancy"], "Fierce, magnetic, and warmly confident. Channel your passionate nature with focused clarity."),
  makeMinorCard("wands", "K", "King", ["vision", "entrepreneurship", "leadership"], "Charismatic leadership and entrepreneurial vision. Take command with boldness and experience."),
];

const cupsCards: TarotCard[] = [
  makeMinorCard("cups", "A", "Ace", ["love", "new feelings", "emotional opening"], "An outpouring of love and emotional new beginnings. Open your heart to what is offered."),
  makeMinorCard("cups", "2", "Two", ["union", "partnership", "connection"], "Deep connection and mutual attraction. A meaningful bond is forming or deepening."),
  makeMinorCard("cups", "3", "Three", ["celebration", "friendship", "community"], "Joyful gathering and friendship in full bloom. Celebrate your connections and shared abundance."),
  makeMinorCard("cups", "4", "Four", ["apathy", "contemplation", "reevaluation"], "Boredom or discontent prompts reflection. Look inward — something new is being offered if you look up."),
  makeMinorCard("cups", "5", "Five", ["loss", "grief", "regret"], "Acknowledge what has been lost, but don't overlook what remains. Healing begins with honesty."),
  makeMinorCard("cups", "6", "Six", ["nostalgia", "memories", "innocence"], "The sweetness of the past revisits. Childhood memories, old friends, or simple joy returns."),
  makeMinorCard("cups", "7", "Seven", ["fantasy", "illusion", "choices"], "Many options dazzle you but some may be illusions. Choose with both heart and discernment."),
  makeMinorCard("cups", "8", "Eight", ["withdrawal", "moving on", "seeking meaning"], "Walking away from what no longer fulfills. Seek deeper meaning beyond what glitters."),
  makeMinorCard("cups", "9", "Nine", ["contentment", "wishes", "satisfaction"], "Your wish is within reach. Emotional contentment and personal satisfaction are yours to embrace."),
  makeMinorCard("cups", "10", "Ten", ["harmony", "happiness", "family"], "Emotional fulfillment and lasting harmony. A picture of joy, love, and a happy heart."),
  makeMinorCard("cups", "P", "Page", ["intuition", "sensitivity", "dreams"], "A dreamy, intuitive message arrives. Listen to your inner voice and embrace creative feelings."),
  makeMinorCard("cups", "Kn", "Knight", ["romance", "idealism", "charm"], "A romantic and idealistic journey. Lead with your heart but keep one foot on the ground."),
  makeMinorCard("cups", "Q", "Queen", ["compassion", "empathy", "nurturing"], "Deep empathy and emotional wisdom. Offer compassion freely and trust your intuitive knowing."),
  makeMinorCard("cups", "K", "King", ["emotional balance", "wisdom", "diplomacy"], "Calm authority and emotional mastery. Lead with wisdom and a compassionate, steady heart."),
];

const swordsCards: TarotCard[] = [
  makeMinorCard("swords", "A", "Ace", ["truth", "clarity", "breakthrough"], "A moment of piercing clarity and breakthrough. The truth cuts through confusion — embrace it."),
  makeMinorCard("swords", "2", "Two", ["indecision", "stalemate", "avoidance"], "A difficult choice kept at arm's length. Blindfolds must come off — face the decision honestly."),
  makeMinorCard("swords", "3", "Three", ["heartbreak", "grief", "sorrow"], "Sorrow and heartache that must be processed. Grief is not weakness — it is the price of love."),
  makeMinorCard("swords", "4", "Four", ["rest", "recovery", "sanctuary"], "A necessary retreat for rest and recovery. Pause, recuperate, and gather strength."),
  makeMinorCard("swords", "5", "Five", ["conflict", "defeat", "power struggle"], "A hollow victory or painful loss. Ask yourself if winning this battle is worth the cost."),
  makeMinorCard("swords", "6", "Six", ["transition", "moving on", "calmer waters"], "Moving away from turbulence toward calmer shores. A difficult journey toward peace and healing."),
  makeMinorCard("swords", "7", "Seven", ["deception", "strategy", "cunning"], "Careful strategy and cautious steps. Someone may not be fully honest — including yourself."),
  makeMinorCard("swords", "8", "Eight", ["restriction", "self-limiting beliefs", "trapped"], "You feel trapped, but the bonds are largely mental. Question the stories that keep you confined."),
  makeMinorCard("swords", "9", "Nine", ["anxiety", "worry", "nightmares"], "The mind torments itself at midnight. Confront the fears that haunt you — most are far smaller in daylight."),
  makeMinorCard("swords", "10", "Ten", ["endings", "painful conclusion", "rock bottom"], "A painful ending, but the lowest point. From here, the only direction is upward — surrender and begin again."),
  makeMinorCard("swords", "P", "Page", ["curiosity", "intellect", "communication"], "Sharp-minded and eager for truth. A message arrives, or a new intellectual pursuit begins."),
  makeMinorCard("swords", "Kn", "Knight", ["ambition", "action", "directness"], "Charging forward with sharp focus and bold ambition. Speak truth, act decisively, but heed caution."),
  makeMinorCard("swords", "Q", "Queen", ["clarity", "independence", "perception"], "Clear-eyed wisdom and hard-won independence. Cut through the noise with honest, perceptive thinking."),
  makeMinorCard("swords", "K", "King", ["authority", "intellect", "truth"], "Mastery of thought, language, and principled authority. Lead with clarity, precision, and fairness."),
];

const pentaclesCards: TarotCard[] = [
  makeMinorCard("pentacles", "A", "Ace", ["opportunity", "prosperity", "new venture"], "A golden opportunity for material growth and prosperity. Plant this seed with intention."),
  makeMinorCard("pentacles", "2", "Two", ["balance", "adaptability", "juggling"], "Keeping multiple priorities in balance. Adapt with grace as circumstances shift."),
  makeMinorCard("pentacles", "3", "Three", ["collaboration", "skill", "teamwork"], "Skilled teamwork and craftsmanship bear fruit. Collaborate and invest in quality work."),
  makeMinorCard("pentacles", "4", "Four", ["security", "possessiveness", "control"], "Clinging to security out of fear. Hold what matters, but don't let fear of loss block abundance."),
  makeMinorCard("pentacles", "5", "Five", ["hardship", "need", "isolation"], "A time of material or spiritual lack. Seek the help that is available — you need not suffer alone."),
  makeMinorCard("pentacles", "6", "Six", ["generosity", "charity", "balance"], "Give and receive with an open hand. Generosity and equitable exchange create lasting prosperity."),
  makeMinorCard("pentacles", "7", "Seven", ["patience", "investment", "growth"], "Long-term effort pays off with patience. Pause and assess your progress before pressing forward."),
  makeMinorCard("pentacles", "8", "Eight", ["diligence", "mastery", "skill"], "Dedicated practice and the slow mastery of a craft. Hard work now builds lasting, meaningful skill."),
  makeMinorCard("pentacles", "9", "Nine", ["independence", "luxury", "refinement"], "The reward of disciplined effort. Enjoy the fruits of your labor with quiet, elegant confidence."),
  makeMinorCard("pentacles", "10", "Ten", ["legacy", "wealth", "family"], "Enduring wealth, legacy, and family security. The long game has been won — celebrate deep roots."),
  makeMinorCard("pentacles", "P", "Page", ["opportunity", "study", "ambition"], "A studious, ambitious young spirit. A new opportunity for practical learning and real-world growth."),
  makeMinorCard("pentacles", "Kn", "Knight", ["reliability", "hard work", "methodical"], "Steady, methodical, and utterly reliable. Progress may be slow but the footing is sure."),
  makeMinorCard("pentacles", "Q", "Queen", ["practicality", "abundance", "nurturing"], "Grounded abundance and practical wisdom. Tend to home, body, and finances with loving care."),
  makeMinorCard("pentacles", "K", "King", ["prosperity", "security", "discipline"], "Mastery of the material world through discipline and long-term vision. Build with patience."),
];

export const tarotDeck: TarotCard[] = [
  ...majorArcana,
  ...wandsCards,
  ...cupsCards,
  ...swordsCards,
  ...pentaclesCards,
];

export function drawRandomCard(): TarotCard {
  return tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
}

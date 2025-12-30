import Admin from '../models/admin.model'; 
// Make sure to connect to DB inside your API routes before calling this

const MEMBERSHIP_LIMITS = {
  basic: 5,
  advance: 15,   // Adjust these values to match your 'buy-premium' logic
  pro: 30      // Adjust these values to match your 'buy-premium' logic
};

const RENEWAL_PERIOD_DAYS = 30;

export async function ensureUserCredits(adminId: string) {
  const admin = await Admin.findById(adminId);

  if (!admin) throw new Error("Admin not found");

  const now = new Date();
  
  // Check if membership expired
  if (admin.membership !== 'basic' && admin.membershipLastDate && now > admin.membershipLastDate) {
    console.log(`⚠️ Membership expired for ${admin.email}. Downgrading to basic.`);
    admin.membership = 'basic';
    await admin.save();
  }
  
  // Determine credit limit based on membership
  const userMembership = admin.membership || 'basic';
  const monthlyCredits = MEMBERSHIP_LIMITS[userMembership as keyof typeof MEMBERSHIP_LIMITS] || MEMBERSHIP_LIMITS.basic;
  
  // 2. Handle new users or missing dates (First time initialization)
  if (!admin.creditsLastReset) {
    console.log(`🆕 Initializing credits for admin ${admin.email} (${userMembership})...`);
    admin.uploadCredit = monthlyCredits;
    admin.creditsLastReset = now;
    await admin.save();
    return admin;
  }

  const lastRefill = new Date(admin.creditsLastReset);

  // Calculate difference in months (roughly)
  // Or simpler: Check if 30 days have passed
  const daysSinceRefill = (now.getTime() - lastRefill.getTime()) / (1000 * 3600 * 24);

  // If more than 30 days have passed, REFILL
  if (daysSinceRefill >= RENEWAL_PERIOD_DAYS) {
    console.log(`🔄 Refilling credits for admin ${admin.email} (${userMembership})...`);
    
    // Logic: Reset credits and update the 'creditsLastReset' to NOW
    admin.uploadCredit = monthlyCredits; 
    admin.creditsLastReset = now; 

    await admin.save();
    return admin; // Return updated admin
  }

  return admin; // Return original admin (no update needed)
}
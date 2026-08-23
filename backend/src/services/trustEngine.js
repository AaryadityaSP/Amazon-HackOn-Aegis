/**
 * Trust Scoring Engine for Aegis
 * Dynamically computes and updates Seller Trust Scores and Customer Merit Scores.
 */

/**
 * Calculates the Seller Trust Score based on multiple signals.
 * @param {Object} sellerData - Data related to the seller.
 * @param {number} sellerData.listingQualityAvg - Avg image integrity score of all listings (0-100).
 * @param {number} sellerData.reviewAuthenticityAvg - Avg authenticity score of product reviews (0-100).
 * @param {number} sellerData.orders - Total orders.
 * @param {number} sellerData.returns - Total returns.
 * @param {number} sellerData.descriptionQualityAvg - Avg description quality score (0-100).
 * @param {number} sellerData.monthsSinceCreation - Months since account creation.
 * @returns {number} The calculated Seller Trust Score (0-100).
 */
function calculateSellerTrustScore(sellerData) {
    console.log('📈 [TrustEngine] Calculating Seller Trust Score...');
    const {
        listingQualityAvg = 0,
        reviewAuthenticityAvg = 0,
        orders = 0,
        returns = 0,
        descriptionQualityAvg = 0,
        monthsSinceCreation = 0
    } = sellerData;

    const fulfillmentRate = orders > 0 ? ((orders - returns) / orders) * 100 : 100;
    const accountAgeFactor = Math.min(monthsSinceCreation / 12, 1) * 100;

    const score = (
        (listingQualityAvg * 0.25) +
        (reviewAuthenticityAvg * 0.25) +
        (fulfillmentRate * 0.20) +
        (descriptionQualityAvg * 0.15) +
        (accountAgeFactor * 0.15)
    );

    const finalScore = Math.min(Math.max(score, 0), 100);
    console.log(`📊 [TrustEngine] Seller Score Calculated: ${finalScore.toFixed(2)}`);
    return finalScore;
}

/**
 * Returns the seller badge tier object based on score.
 * @param {number} score - The seller's trust score.
 * @returns {Object} Badge tier details.
 */
function getSellerBadge(score) {
    if (score >= 85) {
        return { name: 'Gold Seller', icon: '🥇', color: '#FFD700', perks: ['Boosted search visibility', 'Reduced fees', 'Priority support', 'Verified badge'] };
    } else if (score >= 65) {
        return { name: 'Silver Seller', icon: '🥈', color: '#C0C0C0', perks: ['Standard visibility', 'Standard fees', 'Email support'] };
    } else if (score >= 45) {
        return { name: 'Bronze Seller', icon: '🥉', color: '#CD7F32', perks: ['Reduced visibility', 'Increased monitoring'] };
    } else {
        return { name: 'Under Review', icon: '🚫', color: '#FF4444', perks: ['Listings may be hidden', 'Manual review required', 'Limited selling'] };
    }
}

/**
 * Calculates the Customer Merit Score.
 * @param {Object} customerData - Data related to the customer.
 * @param {number} customerData.totalOrders - Total number of orders placed.
 * @param {number} customerData.totalReturns - Total number of returns.
 * @param {number} customerData.honestReturns - Number of honest returns.
 * @param {number} customerData.reviewQuality - Avg authenticity of reviews they've written (0-100).
 * @param {number} customerData.monthsSinceCreation - Months since account creation.
 * @param {number} customerData.collabCount - Number of collaborations participated in.
 * @returns {number} The calculated Customer Merit Score (0-100).
 */
function calculateCustomerMeritScore(customerData) {
    console.log('🧑‍🤝‍🧑 [TrustEngine] Calculating Customer Merit Score...');
    const {
        totalOrders = 0,
        totalReturns = 0,
        honestReturns = 0,
        reviewQuality = 0,
        monthsSinceCreation = 0,
        collabCount = 0
    } = customerData;

    const purchaseConsistency = Math.min(totalOrders / 20, 1) * 100;
    const returnHonesty = totalReturns > 0 ? (honestReturns / totalReturns) * 100 : 100;
    const accountAgeFactor = Math.min(monthsSinceCreation / 12, 1) * 100;
    const collabParticipation = Math.min(collabCount / 5, 1) * 100;

    const score = (
        (purchaseConsistency * 0.20) +
        (returnHonesty * 0.30) +
        (reviewQuality * 0.25) +
        (accountAgeFactor * 0.10) +
        (collabParticipation * 0.15)
    );

    const finalScore = Math.min(Math.max(score, 0), 100);
    console.log(`🎯 [TrustEngine] Customer Merit Score Calculated: ${finalScore.toFixed(2)}`);
    return finalScore;
}

/**
 * Returns the customer tier object based on score.
 * @param {number} score - The customer's merit score.
 * @returns {Object} Tier details.
 */
function getCustomerTier(score) {
    if (score >= 85) {
        return { tier: 'Trusted Customer', badge: '⭐', returnPolicy: '7 Days Return & Refund', cashback: 'Eligible for Special Cashback', deliveryPriority: true, color: '#4CAF50' };
    } else if (score >= 60) {
        return { tier: 'Regular Customer', badge: '👤', returnPolicy: '4 Days Return & Refund', cashback: 'Eligible for Basic Cashback', deliveryPriority: false, color: '#FF9800' };
    } else {
        return { tier: 'Needs Improvement', badge: '⚠️', returnPolicy: 'No Return Policy', cashback: 'No Cashback Benefits', deliveryPriority: false, color: '#f44336' };
    }
}

/**
 * Processes a trust-relevant event and returns updated scores.
 * @param {string} eventType - The type of event.
 * @param {Object} eventData - The data associated with the event.
 * @param {Object} eventData.sellerData - Current seller data.
 * @param {Object} eventData.customerData - Current customer data.
 * @returns {Object} Result object containing updated scores, badges/tiers, and emitted events.
 */
function processEvent(eventType, eventData) {
    console.log(`⚡ [TrustEngine] Processing Event: ${eventType}`);
    const { sellerData = {}, customerData = {} } = eventData;
    const result = { events: [] };

    // Create copies to modify
    let currentSellerData = { ...sellerData };
    let currentCustomerData = { ...customerData };

    switch (eventType) {
        case 'REVIEW_SUBMITTED':
            console.log('📝 [TrustEngine] Event: Review Submitted');
            // Mock logic to update data based on review
            if (eventData.reviewScore) {
                currentSellerData.reviewAuthenticityAvg = ((currentSellerData.reviewAuthenticityAvg || 0) + eventData.reviewScore) / 2;
                currentCustomerData.reviewQuality = ((currentCustomerData.reviewQuality || 0) + eventData.reviewScore) / 2;
            }
            break;
        case 'REVIEW_FLAGGED':
            console.log('🚩 [TrustEngine] Event: Review Flagged');
            currentSellerData.reviewAuthenticityAvg = Math.max(0, (currentSellerData.reviewAuthenticityAvg || 0) - 10);
            break;
        case 'LISTING_CREATED':
            console.log('📦 [TrustEngine] Event: Listing Created');
            if (eventData.imageIntegrityScore) {
                currentSellerData.listingQualityAvg = ((currentSellerData.listingQualityAvg || 0) + eventData.imageIntegrityScore) / 2;
            }
            break;
        case 'LISTING_FLAGGED':
            console.log('🚨 [TrustEngine] Event: Listing Flagged');
            currentSellerData.listingQualityAvg = Math.max(0, (currentSellerData.listingQualityAvg || 0) - 20);
            break;
        case 'RETURN_PROCESSED':
            console.log('🔄 [TrustEngine] Event: Return Processed');
            currentCustomerData.totalReturns = (currentCustomerData.totalReturns || 0) + 1;
            if (eventData.isHonest) {
                currentCustomerData.honestReturns = (currentCustomerData.honestReturns || 0) + 1;
            }
            currentSellerData.returns = (currentSellerData.returns || 0) + 1;
            break;
        case 'RETURN_FLAGGED':
            console.log('🚫 [TrustEngine] Event: Return Flagged');
            currentCustomerData.totalReturns = (currentCustomerData.totalReturns || 0) + 1;
            // honest returns stays same, which penalizes the honesty ratio
            break;
        case 'COLLAB_COMPLETED':
            console.log('🤝 [TrustEngine] Event: Collab Completed');
            currentCustomerData.collabCount = (currentCustomerData.collabCount || 0) + 1;
            break;
        default:
            console.log(`⚠️ [TrustEngine] Unknown event type: ${eventType}`);
    }

    // Recalculate if there is seller data provided
    if (Object.keys(sellerData).length > 0) {
        const oldScore = calculateSellerTrustScore(sellerData);
        const oldBadge = getSellerBadge(oldScore);
        
        result.sellerScore = calculateSellerTrustScore(currentSellerData);
        result.sellerBadge = getSellerBadge(result.sellerScore);
        result.events.push('SCORE_UPDATED');
        
        if (oldBadge.name !== result.sellerBadge.name) {
            console.log(`🏆 [TrustEngine] Seller Badge Changed: ${oldBadge.name} -> ${result.sellerBadge.name}`);
            result.events.push('BADGE_CHANGED');
        }
    }

    // Recalculate if there is customer data provided
    if (Object.keys(customerData).length > 0) {
        const oldScore = calculateCustomerMeritScore(customerData);
        const oldTier = getCustomerTier(oldScore);
        
        result.customerScore = calculateCustomerMeritScore(currentCustomerData);
        result.customerTier = getCustomerTier(result.customerScore);
        
        if (!result.events.includes('SCORE_UPDATED')) {
            result.events.push('SCORE_UPDATED');
        }
        
        if (oldTier.tier !== result.customerTier.tier) {
            console.log(`🏅 [TrustEngine] Customer Tier Changed: ${oldTier.tier} -> ${result.customerTier.tier}`);
            if (!result.events.includes('BADGE_CHANGED')) {
                result.events.push('BADGE_CHANGED');
            }
        }
    }

    return result;
}

module.exports = {
    calculateSellerTrustScore,
    calculateCustomerMeritScore,
    getSellerBadge,
    getCustomerTier,
    processEvent
};

// CRM API Integration
// Update VITE_CRM_API_URL in .env to point to your deployed backend

const CRM_API_URL = "/api";

const addIfFilled = (payload, key, value) => {
  if (typeof value === "string" && value.trim()) {
    payload[key] = value.trim();
  }
};

/**
 * Submit a lead to the CRM system
 * @param {Object} leadData
 * @param {string} leadData.fullName
 * @param {string} leadData.mobile
 * @param {string} [leadData.email]
 * @param {string} [leadData.city]
 * @param {string} [leadData.budget]
 * @param {string} [leadData.plotInterest]
 * @param {string} [leadData.message]
 * @param {string} [leadData.source]
 * @param {string} [leadData.page]
 * @returns {Promise<{success: boolean, message: string, leadId?: number, duplicate?: boolean}>}
 */
export async function submitLeadToCRM(leadData) {
  try {
    const payload = {
      fullName: leadData.fullName?.trim() || "",
      mobile: leadData.mobile?.trim() || "",
      source: leadData.source?.trim() || "Website",
      page: leadData.page?.trim() || "Home",
    };

    addIfFilled(payload, "email", leadData.email);
    addIfFilled(payload, "city", leadData.city);
    addIfFilled(payload, "budget", leadData.budget);
    addIfFilled(payload, "plotInterest", leadData.plotInterest);
    addIfFilled(payload, "message", leadData.message);

    const response = await fetch(`${CRM_API_URL}/public/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      return { success: true, message: data.message, leadId: data.leadId, duplicate: data.duplicate };
    } else {
      console.error("CRM lead submission failed:", data);
      const validationMessage = data.errors
        ? Object.values(data.errors).flat().join(" ")
        : "";

      return { success: false, message: data.message || validationMessage || "Submission failed" };
    }
  } catch (error) {
    console.error("CRM API error:", error);
    return { success: false, message: "Network error. Please try again." };
  }
}

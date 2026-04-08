/**
 * app.js — Sree Sakthi Automobiles EMS
 * Firebase configuration & shared utilities
 */

// 1. Unga Firebase Configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDFls9s5jdmfhkg_lB9XRJhpba-hM84AmE",
  authDomain: "swaraj-employee-monitoring.firebaseapp.com",
  databaseURL: "https://swaraj-employee-monitoring-default-rtdb.firebaseio.com",
  projectId: "swaraj-employee-monitoring",
  storageBucket: "swaraj-employee-monitoring.firebasestorage.app",
  messagingSenderId: "1080313830317",
  appId: "1:1080313830317:web:ed74c2fd800bb8551c5f24",
  measurementId: "G-8M5J0CYF51"
};

// 2. Role Based Redirection Logic
export const ROLE_REDIRECT = {
  admin:           "admin.html",
  manager:         "manager.html",
  service_manager: "service.html",
  mechanic:        "dashboard.html",
  salesman:        "dashboard.html"
};

// 3. Department Mapping
export const DEPT_MAP = {
  admin:           "Management",
  manager:         "Management",
  service_manager: "Service",
  mechanic:        "Workshop",
  salesman:        "Sales"
};

export const FIELD_ROLES = ["mechanic", "salesman"];
export const TASK_ASSIGNER_ROLES = ["admin", "service_manager"];

// 4. SHARED UTILITY: Toast notification
export function showToast(msg, type = "success", toastId = "toast") {
  const t = document.getElementById(toastId);
  if (!t) return;
  t.textContent = msg;
  t.className = `toast ${type}`;
  clearTimeout(t._hideTimer);
  t._hideTimer = setTimeout(() => t.classList.add("hidden"), 3500);
}

// 5. SHARED UTILITY: Toggle button loading state
export function setLoading(textId, spinnerId, on) {
  const textEl    = document.getElementById(textId);
  const spinnerEl = document.getElementById(spinnerId);
  if (textEl)    textEl.classList.toggle("hidden", on);
  if (spinnerEl) spinnerEl.classList.toggle("hidden", !on);
}

// 6. SETUP HELPER: createUser Function
export async function createUser(auth, db, name, email, password, role, phone = "") {
  const { createUserWithEmailAndPassword }
    = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js");
  const { doc, setDoc, serverTimestamp }
    = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");

  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", cred.user.uid), {
    name,
    email,
    phone,
    role,
    department: DEPT_MAP[role] || "General",
    createdAt: serverTimestamp()
  });
  return cred.user.uid;
}

// Legacy Console Helper
export async function setupUser(auth, db, email, password, name, role) {
  return createUser(auth, db, name, email, password, role);
}
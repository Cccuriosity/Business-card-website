const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function refreshToken(): Promise<boolean> {
    const refresh_token = localStorage.getItem("refresh_token");
    if (!refresh_token) return false;

    try {
        const res = await fetch(`${API_BASE}/auth/token/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token }),
        });
        if (!res.ok) return false;
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("refresh_token", data.refresh_token);
        return true;
    } catch {
        return false;
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("isAdmin");
    window.location.href = "/pages/profile/signin";
}

export async function fetchWithAuth(
    url: string,
    options: RequestInit = {},
    retry = true
): Promise<Response> {
    const res = await fetch(url, options);

    if (res.status === 401 && retry) {
        if (!localStorage.getItem("refresh_token")) {
            return res;
        }

        const refreshed = await refreshToken();
        if (refreshed) {
            const newOptions = {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: 'Bearer ${localStorage.getItem("token")}',
                },
            };
            return fetchWithAuth(url, newOptions, false);
        } else {
            logout();
            throw new Error("Сессия истекла");
        }
    }

    return res;
}

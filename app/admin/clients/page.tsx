"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { clientService, Client } from "@/lib/supabase/admin-service";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  Building2,
  Plus,
  Pencil,
  Trash2,
  Globe,
  Loader2,
  Search,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Sparkles,
  X,
  ArrowUpDown,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CLIENT_TYPES: Client["type"][] = [
  "Embassy",
  "International Organization",
  "Corporate",
  "Government",
];

const TYPE_COLORS: Record<Client["type"], { badge: string; dot: string }> = {
  Embassy: { badge: "bg-emerald-100 text-emerald-900 border-emerald-300", dot: "bg-emerald-500" },
  "International Organization": { badge: "bg-blue-100 text-blue-900 border-blue-300", dot: "bg-blue-500" },
  Corporate: { badge: "bg-amber-100 text-amber-900 border-amber-300", dot: "bg-amber-500" },
  Government: { badge: "bg-purple-100 text-purple-900 border-purple-300", dot: "bg-purple-500" },
};

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // Form inputs
  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState<Client["type"]>("Corporate");
  const [formLogoUrl, setFormLogoUrl] = useState<string>("");
  const [formWebsiteUrl, setFormWebsiteUrl] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);
  const [formSortOrder, setFormSortOrder] = useState<number>(0);

  async function loadClients() {
    setIsLoading(true);
    try {
      const data = await clientService.getAll();
      setClients(data);
    } catch (err) {
      console.error("Error loading clients:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadClients();
  }, []);

  const openCreateForm = () => {
    setEditingClient(null);
    setFormName("");
    setFormType("Corporate");
    setFormLogoUrl("");
    setFormWebsiteUrl("");
    setFormIsActive(true);
    setFormSortOrder(clients.length);
    setIsFormOpen(true);
  };

  const openEditForm = (client: Client) => {
    setEditingClient(client);
    setFormName(client.name);
    setFormType(client.type);
    setFormLogoUrl(client.logo_url || "");
    setFormWebsiteUrl(client.website_url || "");
    setFormIsActive(client.is_active);
    setFormSortOrder(client.sort_order);
    setIsFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    setIsSaving(true);
    try {
      if (editingClient) {
        // Update
        const updated = await clientService.update(editingClient.id, {
          name: formName.trim(),
          type: formType,
          logo_url: formLogoUrl.trim() || null,
          website_url: formWebsiteUrl.trim() || null,
          is_active: formIsActive,
          sort_order: Number(formSortOrder) || 0,
        });

        if (updated) {
          setClients((prev) =>
            prev.map((c) => (c.id === editingClient.id ? updated : c))
          );
        }
      } else {
        // Create
        const created = await clientService.create({
          name: formName.trim(),
          type: formType,
          logo_url: formLogoUrl.trim() || null,
          website_url: formWebsiteUrl.trim() || null,
          is_active: formIsActive,
          sort_order: Number(formSortOrder) || 0,
        });

        if (created) {
          setClients((prev) => [...prev, created]);
        }
      }
      setIsFormOpen(false);
    } catch (err) {
      console.error("Failed to save client:", err);
      alert("Failed to save client. Please check console for details.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete client "${name}"?`)) return;

    try {
      const ok = await clientService.delete(id);
      if (ok) {
        setClients((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete client:", err);
      alert("Failed to delete client.");
    }
  };

  const handleToggleActive = async (client: Client) => {
    try {
      const updated = await clientService.update(client.id, {
        is_active: !client.is_active,
      });
      if (updated) {
        setClients((prev) =>
          prev.map((c) => (c.id === client.id ? updated : c))
        );
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const handleSeedDefaults = async () => {
    if (
      !confirm(
        "This will add standard embassies and corporate clients to your database. Continue?"
      )
    )
      return;

    setIsSeeding(true);
    try {
      await clientService.seedDefaults();
      await loadClients();
      alert("Default clients seeded successfully!");
    } catch (err) {
      console.error("Failed to seed default clients:", err);
      alert("Failed to seed clients. Make sure Supabase table is created.");
    } finally {
      setIsSeeding(false);
    }
  };

  // Filtered clients list
  const filteredClients = clients.filter((c) => {
    if (selectedType !== "All" && c.type !== selectedType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        c.name.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalCount = clients.length;
  const activeCount = clients.filter((c) => c.is_active).length;
  const embassyCount = clients.filter((c) => c.type === "Embassy").length;
  const corporateCount = clients.filter((c) => c.type === "Corporate").length;

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2.5">
            <Building2 className="h-8 w-8 text-emerald-700" />
            <span>Client & Embassy Management</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Add, update, or remove embassies, multinational companies, and client logos shown on the homepage marquee & clients directory.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {clients.length === 0 && (
            <Button
              variant="outline"
              onClick={handleSeedDefaults}
              disabled={isSeeding}
              className="gap-2 border-emerald-300 text-emerald-800 hover:bg-emerald-50"
            >
              {isSeeding ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span>Seed Default Clients</span>
            </Button>
          )}

          <Button
            onClick={openCreateForm}
            className="gap-2 bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Client</span>
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-white shadow-xs border border-gray-200">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Total Clients</span>
          <span className="text-2xl font-black text-gray-900 mt-1 block">{totalCount}</span>
        </Card>
        <Card className="p-4 bg-white shadow-xs border border-gray-200">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Active Live</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">{activeCount}</span>
        </Card>
        <Card className="p-4 bg-white shadow-xs border border-gray-200">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Embassies</span>
          <span className="text-2xl font-black text-emerald-800 mt-1 block">{embassyCount}</span>
        </Card>
        <Card className="p-4 bg-white shadow-xs border border-gray-200">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Corporates</span>
          <span className="text-2xl font-black text-amber-700 mt-1 block">{corporateCount}</span>
        </Card>
      </div>

      {/* Controls Bar: Search & Category Badges */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name or category..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setSelectedType("All")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer",
                selectedType === "All"
                  ? "bg-emerald-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              All ({clients.length})
            </button>
            {CLIENT_TYPES.map((type) => {
              const count = clients.filter((c) => c.type === type).length;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer",
                    selectedType === type
                      ? "bg-emerald-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {type} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Clients Table / List */}
      {isLoading ? (
        <div className="py-20 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-emerald-700 mb-3" />
          <p className="text-sm text-gray-500">Loading client registry...</p>
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-gray-200">
          <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-800">No clients found</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
            {searchQuery || selectedType !== "All"
              ? "Try adjusting your search query or category filter."
              : "Click Add Client or Seed Default Clients above to add your first client."}
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Button onClick={openCreateForm} size="sm" className="bg-emerald-700 text-white">
              Add New Client
            </Button>
            <Button onClick={handleSeedDefaults} variant="outline" size="sm">
              Seed Defaults
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 w-12">#</th>
                  <th className="py-3.5 px-4">Client / Logo</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Website</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredClients.map((client, idx) => {
                  const typeStyle = TYPE_COLORS[client.type] || {
                    badge: "bg-gray-100 text-gray-800 border-gray-200",
                    dot: "bg-gray-400",
                  };

                  return (
                    <tr key={client.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono text-xs text-gray-400 font-bold">
                        {client.sort_order ?? idx + 1}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {client.logo_url ? (
                            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                              <img
                                src={client.logo_url}
                                alt={client.name}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-black text-sm flex items-center justify-center shrink-0">
                              {client.name.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-gray-900 block leading-snug">
                              {client.name}
                            </span>
                            <span className="text-[11px] text-gray-400 font-medium">
                              ID: {client.id.substring(0, 14)}...
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border",
                            typeStyle.badge
                          )}
                        >
                          <span className={cn("w-1.5 h-1.5 rounded-full", typeStyle.dot)} />
                          {client.type}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        {client.website_url ? (
                          <a
                            href={client.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-900 font-semibold hover:underline"
                          >
                            <span>Visit</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(client)}
                          className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer",
                            client.is_active
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          )}
                        >
                          {client.is_active ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3.5 w-3.5 text-gray-400" />
                              <span>Hidden</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditForm(client)}
                            className="h-8 w-8 p-0 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50"
                            aria-label="Edit client"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(client.id, client.name)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                            aria-label="Delete client"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                {editingClient ? "Edit Client" : "New Client Entry"}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {editingClient ? `Update: ${editingClient.name}` : "Add Organization / Embassy"}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Client Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">
                  Organization / Embassy Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Royal Danish Embassy / Unilever Bangladesh"
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Client Category / Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">
                  Category Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value as Client["type"])}
                  className="w-full h-11 px-3 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                >
                  {CLIENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Logo Upload & URL */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                  <span>Client Logo (Upload or URL)</span>
                  {formLogoUrl && (
                    <button
                      type="button"
                      onClick={() => setFormLogoUrl("")}
                      className="text-[11px] text-red-600 hover:underline font-normal"
                    >
                      Clear Logo
                    </button>
                  )}
                </label>

                {formLogoUrl ? (
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-200">
                    <div className="w-16 h-12 rounded-xl bg-white border border-gray-200 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                      <img
                        src={formLogoUrl}
                        alt="Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-gray-800 block truncate">
                        {formLogoUrl}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold">Logo Ready</span>
                    </div>
                  </div>
                ) : (
                  <ImageUploader
                    value={formLogoUrl}
                    onChange={(val) => setFormLogoUrl(Array.isArray(val) ? val[0] || "" : val)}
                    folder="clients"
                    multiple={false}
                  />
                )}
              </div>

              {/* Website URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">
                  Official Website (Optional)
                </label>
                <input
                  type="url"
                  value={formWebsiteUrl}
                  onChange={(e) => setFormWebsiteUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Sort Order & Active */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">Display Order</label>
                  <input
                    type="number"
                    value={formSortOrder}
                    onChange={(e) => setFormSortOrder(parseInt(e.target.value, 10) || 0)}
                    className="w-full h-10 px-3 rounded-xl border border-gray-300 text-sm font-semibold"
                  />
                </div>

                <div className="space-y-1 flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer pb-2">
                    <input
                      type="checkbox"
                      checked={formIsActive}
                      onChange={(e) => setFormIsActive(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-bold text-gray-800">Show on Website</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormOpen(false)}
                  className="h-11 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="h-11 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  <span>{editingClient ? "Update Client" : "Save Client"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

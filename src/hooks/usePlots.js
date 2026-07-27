import { useState, useEffect, useCallback } from 'react';

// Vite proxies this in dev; Hostinger rewrites it to api-proxy.php in production.
const PLOTS_URL = '/api/public/plots';

function normaliseStatus(raw, plot = {}) {
  if (plot.isSold === true || plot.sold === true) return 'sold';
  if (plot.isBooked === true || plot.booked === true) return 'booked';
  if (plot.isAvailable === true || plot.available === true) return 'available';
  if (plot.isAvailable === false || plot.available === false) return 'unavailable';

  const s = (raw ?? '').toString().toLowerCase().trim().replace(/[-_\s]+/g, ' ');
  if (!s) return 'available';
  if (s.includes('sold')) return 'sold';
  if (s.includes('partial') || s === 'part payment' || s === 'partpayment') return 'part_payment';
  if (s.includes('token')) return 'token';
  if (s.includes('book')) return 'booked';
  if (s.includes('hold') || s.includes('reserve') || s.includes('allot')) return 'booked';
  if (s.includes('avail') || s.includes('free') || s.includes('vacant') || s.includes('open')) return 'available';
  return 'unavailable';
}

function mapPlot(p) {
  const size = parseFloat(p.plotSize ?? p.size ?? p.area ?? p.plotArea) || 0;
  const rawStatus = p.status ?? p.plotStatus ?? p.currentStatus ?? p.availabilityStatus ?? p.bookingStatus ?? p.statusName;
  const rate = p.basicRate ?? p.rate ?? p.pricePerSqYd ?? p.pricePerSqYard ?? 0;

  return {
    id: p.id ?? p.plotId ?? p._id ?? p.plotNumber ?? p.plotNo ?? p.number,
    plotNumber: String(p.plotNumber ?? p.plotNo ?? p.number ?? p.name ?? p.id ?? ''),
    block: p.block ?? p.blockName ?? p.phase ?? '',
    size,
    sizeUnit: 'sq.yd',
    siteName: p.siteName,
    status: normaliseStatus(rawStatus, p),
    rate,
    totalPrice: p.totalPrice ?? p.price ?? (size * rate) ?? 0,
    facing: p.facing || 'N/A',
  };
}

function extractPlots(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.plots)) return data.plots;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.result)) return data.result;
  return [];
}

const isAvailablePlot = (plot) => plot.status === 'available';

function getStatsFromPlots(plots) {
  return {
    totalPlots: plots.length,
    available: plots.length,
  };
}

export function usePlots() {
  const [plots, setPlots] = useState([]);
  const [stats, setStats] = useState({ totalPlots: 0, available: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchPlots = useCallback(async () => {
    try {
      const res = await fetch(`${PLOTS_URL}?t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      const data = await res.json();
      const mapped = extractPlots(data).map(mapPlot).filter(isAvailablePlot);

      setPlots(mapped);
      setStats(getStatsFromPlots(mapped));
      setError(null);
    } catch (err) {
      setError(err.message);
      setPlots([]);
      setStats(getStatsFromPlots([]));
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  }, []);

  useEffect(() => {
    fetchPlots();
    const interval = setInterval(fetchPlots, 60_000);
    return () => clearInterval(interval);
  }, [fetchPlots]);

  return { plots, stats, loading, error, lastUpdated, refresh: fetchPlots };
}

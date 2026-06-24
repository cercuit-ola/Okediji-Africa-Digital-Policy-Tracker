-- ═══════════════════════════════════════════════════════════════
-- Africa Digital Policy Tracker — Supabase Migration
-- Run via: psql $DATABASE_URL -f supabase/migration.sql
-- ═══════════════════════════════════════════════════════════════

-- Enable pgvector for future semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- ── Policies table ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS policies (
  id             SERIAL PRIMARY KEY,
  title          TEXT NOT NULL,
  country        TEXT NOT NULL,
  flag           TEXT,
  region         TEXT,
  "group"        TEXT,
  year           INTEGER,
  status         TEXT CHECK (status IN ('in-force','under-review','under-consultation','proposed')),
  area           TEXT,
  instrument     TEXT,
  act            TEXT,
  enacted        TEXT,
  "inForce"      TEXT,
  authority      TEXT,
  "closestFW"    TEXT,
  "simLevel"     TEXT,
  oecd           FLOAT[] DEFAULT '{}',
  summary        TEXT,
  tags           TEXT[] DEFAULT '{}',
  "whoAffects"   TEXT,
  "sectorImpact" TEXT,
  demand         TEXT,
  "keyObs"       TEXT,
  areas          TEXT[] DEFAULT '{}',
  updated        TEXT,
  embedding      vector(1536),       -- for pgvector semantic search (optional)
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Row-level security
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON policies FOR SELECT USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS policies_country_idx ON policies (country);
CREATE INDEX IF NOT EXISTS policies_area_idx    ON policies (area);
CREATE INDEX IF NOT EXISTS policies_status_idx  ON policies (status);
CREATE INDEX IF NOT EXISTS policies_year_idx    ON policies (year);
CREATE INDEX IF NOT EXISTS policies_region_idx  ON policies (region);
CREATE INDEX IF NOT EXISTS policies_search_idx  ON policies
  USING gin(to_tsvector('english', coalesce(title,'') || ' ' || coalesce(summary,'') || ' ' || coalesce(country,'')));

-- Trigger: auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS policies_updated_at ON policies;
CREATE TRIGGER policies_updated_at
  BEFORE UPDATE ON policies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

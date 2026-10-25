import datetime
from typing import List, Tuple
from app.models.assistant import ChatMessageRequest, ChatMessageResponse
from app.services.ai_service import AIService

class KnowledgeBaseService:
    KNOWLEDGE_ENTRIES = [
        {
            "keywords": ["curing", "formwork", "striking", "shuttering", "days", "slab", "beam", "column"],
            "reply": (
                "Per ACI 318 and standard building codes (e.g. IS 456 / BS 8110):\n"
                "1. Vertical formwork to columns, walls, and beams: 16 to 24 hours.\n"
                "2. Soffit formwork to slabs (props left under): 3 days.\n"
                "3. Soffit formwork to beams (props left under): 7 days.\n"
                "4. Removal of props under slabs (spanning up to 4.5m): 7 days; spanning over 4.5m: 14 days.\n"
                "5. Removal of props under beams and arches (spanning up to 6m): 14 days; spanning over 6m: 21 days.\n\n"
                "Always verify concrete has achieved at least 70% of design compressive strength before prop removal."
            ),
            "refs": [
                "ACI 318-19: Building Code Requirements for Structural Concrete",
                "ACI 347R-14: Guide to Formwork for Concrete",
                "IS 456:2000 Clause 11.3 (Stripping Time)"
            ],
            "followups": [
                "What is the recommended curing method for hot weather concreting?",
                "How do compressive cylinder test results correlate with formwork striking?",
                "What admixtures accelerate early compressive strength gain?"
            ]
        },
        {
            "keywords": ["slump", "workability", "concrete test", "consistency"],
            "reply": (
                "Concrete slump test standard specifications (ASTM C143 / IS 1199):\n"
                "• Pavements and mass concrete: 25 - 50 mm (Low workability)\n"
                "• Normal reinforced foundation & beams: 50 - 100 mm (Medium workability)\n"
                "• Heavily reinforced sections, columns & slabs: 100 - 150 mm (High workability)\n"
                "• Tremie pipe underwater concreting & bored piles: 150 - 200 mm (Self-compacting / Superplasticized).\n\n"
                "Note: A shear slump or collapse slump indicates a segregated mix or excessive water-cement ratio; the batch must be rejected."
            ),
            "refs": [
                "ASTM C143 / C143M: Standard Test Method for Slump of Hydraulic-Cement Concrete",
                "ACI 211.1: Standard Practice for Selecting Proportions for Normal Concrete"
            ],
            "followups": [
                "What should be done if slump is lower than required on site?",
                "How does superplasticizer affect slump retention over travel time?"
            ]
        },
        {
            "keywords": ["fall protection", "harness", "scaffold", "height", "osha", "guardrail"],
            "reply": (
                "OSHA Fall Protection Standards (29 CFR 1926 Subpart M):\n"
                "1. Trigger Height: Employers must provide fall protection for each employee on a walking/working surface with an unprotected side or edge that is 6 feet (1.8 m) or more above a lower level.\n"
                "2. Standard Guardrails: Top edge height must be 42 inches (±3 inches) above walking level, with a midrail at 21 inches and minimum 3.5-inch toeboard.\n"
                "3. Personal Fall Arrest Systems (PFAS): Full-body harness with shock-absorbing lanyard, anchored to a point capable of supporting at least 5,000 lbs (22.2 kN) per employee.\n"
                "4. Scaffolding: Fall protection is mandatory on scaffolds higher than 10 feet (1926.451)."
            ),
            "refs": [
                "OSHA 29 CFR 1926.501: Duty to Have Fall Protection",
                "OSHA 29 CFR 1926.502: Fall Protection Systems Criteria and Practices",
                "OSHA 29 CFR 1926.451: General Requirements for Scaffolds"
            ],
            "followups": [
                "What are the inspection requirements for PFAS safety harnesses?",
                "When is safety netting required instead of guardrails?"
            ]
        },
        {
            "keywords": ["rebar", "steel", "lap", "cover", "clear cover", "tmt"],
            "reply": (
                "Standard Reinforcement Clear Cover Requirements (ACI 318 / IS 456):\n"
                "• Concrete cast against and permanently exposed to earth (footings/rafts): 75 mm (3 inches)\n"
                "• Concrete exposed to earth or weather (columns/beams): 40 mm - 50 mm\n"
                "• Concrete not exposed to weather or in contact with ground:\n"
                "   - Slabs: 20 mm - 25 mm\n"
                "   - Beams: 25 mm - 30 mm\n"
                "   - Columns: 40 mm (main bars)\n\n"
                "Standard Lap Length:\n"
                "• Tension laps: 40d to 50d (where d is bar diameter)\n"
                "• Compression laps: 24d to 30d\n"
                "• Lap splices should be staggered and never exceed 50% of bars at a single cross-section."
            ),
            "refs": [
                "ACI 318-19 Section 20.6.1 (Specified Concrete Cover)",
                "IS 456:2000 Clause 26.4 (Cover to Reinforcement)"
            ],
            "followups": [
                "How do mechanical rebar couplers compare to lap splicing?",
                "What is the corrosion protection protocol for marine environments?"
            ]
        }
    ]

    @staticmethod
    def answer_query(req: ChatMessageRequest) -> ChatMessageResponse:
        now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        query_lower = req.message.lower()

        # Check if Gemini AI can answer
        ai_prompt = (
            "You are an expert civil engineer and certified construction safety and standards consultant. "
            f"Answer the following construction inquiry with professional technical depth and reference relevant codes (OSHA, ACI, IBC, ASTM):\n"
            f"Question: {req.message}"
        )
        ai_reply = AIService.call_text_llm(ai_prompt)
        if ai_reply and len(ai_reply) > 50:
            return ChatMessageResponse(
                timestamp=now_str,
                reply=ai_reply,
                code_references=["OSHA 29 CFR 1926", "ACI 318-19", "International Building Code (IBC)"],
                suggested_followups=[
                    "What are the specific site inspection checklists for this scenario?",
                    "How does this impact project schedule and budgeting?",
                    "What quality assurance testing certificates are needed?"
                ]
            )

        # Contextual Knowledge Base Match
        best_match = None
        highest_score = 0
        for entry in KnowledgeBaseService.KNOWLEDGE_ENTRIES:
            score = sum(1 for kw in entry["keywords"] if kw in query_lower)
            if score > highest_score:
                highest_score = score
                best_match = entry

        if best_match and highest_score > 0:
            return ChatMessageResponse(
                timestamp=now_str,
                reply=best_match["reply"],
                code_references=best_match["refs"],
                suggested_followups=best_match["followups"]
            )

        # General Engineering Response
        default_reply = (
            f"Regarding your inquiry on '{req.message}':\n\n"
            "Construction industry best practice dictates adherence to approved structural drawings, site-specific method statements, "
            "and manufacturer technical data sheets (TDS). For structural alterations or deviations, consult the project structural engineer "
            "of record (SEOR) and submit a formal Request for Information (RFI).\n\n"
            "Key Verification Checklist:\n"
            "1. Inspect incoming material mill test certificates (MTC).\n"
            "2. Enforce quality control hold-points prior to any permanent encasement.\n"
            "3. Document all daily inspections with geotagged site photographs and signed checklists."
        )

        return ChatMessageResponse(
            timestamp=now_str,
            reply=default_reply,
            code_references=[
                "International Building Code (IBC) 2024",
                "OSHA 29 CFR 1926 Construction Safety Regulations",
                "ACI Manual of Concrete Practice"
            ],
            suggested_followups=[
                "How to file a formal Request for Information (RFI)?",
                "What are the standard quality control hold-points for concrete works?",
                "What are the OSHA daily inspection requirements?"
            ]
        )

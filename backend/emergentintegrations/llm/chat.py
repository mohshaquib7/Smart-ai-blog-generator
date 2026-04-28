# Mock LLM Chat Module for Emergent Integrations
# This mock generates realistic blog content for development/testing
# Install the real package from Emergent for production LLM functionality

import json
import asyncio
from typing import Optional


class UserMessage:
    """Mock UserMessage class for LLM chat"""
    def __init__(self, text: str):
        self.text = text


class LlmChat:
    """Mock LlmChat class that generates realistic blog content"""
    def __init__(self, api_key: str, session_id: str, system_message: str = ""):
        self.api_key = api_key
        self.session_id = session_id
        self.system_message = system_message
        self.model_info: Optional[tuple] = None
    
    def with_model(self, provider: str, model: str) -> "LlmChat":
        """Set the model to use (e.g., 'openai', 'gpt-5.2')"""
        self.model_info = (provider, model)
        return self
    
    async def send_message(self, message: UserMessage) -> str:
        """Generate a mock blog post response based on the topic"""
        # Simulate network delay
        await asyncio.sleep(0.5)
        
        # Extract topic from the prompt message
        topic = "Technology"
        try:
            if "Write a high-quality blog post about:" in message.text:
                start = message.text.find('about: "') + 8
                end = message.text.find('"', start)
                if start > 7 and end > start:
                    topic = message.text[start:end].strip()
        except Exception:
            pass
        
        # Generate dynamic mock blog post based on topic
        mock_response = {
            "title": f"The Complete Guide to {topic} in 2026: Trends and Insights",
            "introduction": f"{topic} has become increasingly important in the modern world. "
                           f"In 2026, organizations and professionals are recognizing the critical role "
                           f"{topic} plays in driving innovation, efficiency, and success. This comprehensive "
                           f"guide explores key developments, best practices, and future outlook for {topic}.",
            "sections": [
                {
                    "heading": f"Understanding {topic}",
                    "paragraph": f"{topic} encompasses a wide range of practices, technologies, and methodologies "
                               f"that have evolved significantly over recent years. Professionals across industries are "
                               f"discovering new applications and opportunities within {topic}. The landscape continues to shift "
                               f"as organizations adapt to changing market conditions and technological advancements that shape "
                               f"how {topic} is implemented and managed."
                },
                {
                    "heading": f"Current Trends in {topic}",
                    "paragraph": f"The {topic} landscape in 2026 is characterized by rapid innovation and transformation. "
                               f"Organizations are increasingly investing in modern approaches and tools that enhance their "
                               f"{topic} capabilities. Automation, data-driven decision making, and integrated platforms are "
                               f"becoming standard across sectors. Companies that successfully embrace these trends report "
                               f"significant improvements in their competitive positioning and operational performance."
                },
                {
                    "heading": f"Best Practices for {topic} Success",
                    "paragraph": f"To succeed with {topic}, organizations should focus on several key principles: continuous "
                               f"learning, staying adaptable to change, and leveraging the latest tools and technologies available. "
                               f"Building a strong foundation in {topic} fundamentals is essential. Additionally, fostering a culture "
                               f"of innovation and encouraging team collaboration can significantly enhance {topic} initiatives and "
                               f"drive better outcomes across the organization."
                },
                {
                    "heading": f"The Future of {topic}",
                    "paragraph": f"Looking ahead beyond 2026, {topic} will continue to evolve rapidly with emerging technologies "
                               f"and changing market conditions. Artificial intelligence, advanced analytics, and new methodologies "
                               f"will reshape how {topic} is approached. Organizations that invest in staying current with developments "
                               f"and nurture expertise in {topic} will be well-positioned for long-term success. The key to thriving "
                               f"is maintaining agility and commitment to continuous improvement."
                }
            ],
            "conclusion": f"In conclusion, {topic} requires a strategic, forward-thinking approach. Organizations that embrace "
                         f"innovation, invest in their teams, and adapt to changing circumstances will excel. The opportunities "
                         f"presented by {topic} are vast, and those who master these capabilities will gain significant competitive "
                         f"advantages. As we progress through 2026 and beyond, {topic} will continue to be a critical success factor "
                         f"for organizations across all industries.",
            "keywords": [
                topic.lower(),
                f"{topic} trends 2026",
                f"{topic} best practices",
                f"how to {topic.lower()}",
                f"{topic} strategy",
                f"{topic} tools and techniques",
                f"implementing {topic.lower()}",
                f"{topic} guide"
            ],
            "meta_description": f"Discover the complete guide to {topic} in 2026: explore emerging trends, best practices, "
                               f"strategies, and insights for staying ahead in this rapidly evolving field."
        }
        
        return json.dumps(mock_response)


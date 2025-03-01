using System.Text;
using System;
using MePlusPlusBE.AIModels;
using MePlusPlusBE.AIModels.ContentResponse;
using Newtonsoft.Json;

namespace MePlusPlusBE.AIClient
{
    public class GeminiApiClient
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        public GeminiApiClient(string apiKey)
        {
            _httpClient = new HttpClient();
            _apiKey = apiKey;
        }
        public async Task<string> GenerateContentAsync(string prompt)
        {
            string url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={_apiKey}";
            var request = new ContentRequest
            {
                contents = new[]
                {
                    new AIModels.Content
                    {
                        parts = new[]
                        {
                            new AIModels.Part
                            {
                                text = prompt
                            }
                        }
                    }
                }
            };
            string jsonRequest = JsonConvert.SerializeObject(request);
            var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _httpClient.PostAsync(url, content);

            if (response.IsSuccessStatusCode)
            {
                string jsonResponse = await response.Content.ReadAsStringAsync();
                // You can deserialize jsonResponse if needed
                var geminiResponse = JsonConvert.DeserializeObject<ContentResponse>(jsonResponse);
                return geminiResponse.Candidates[0].Content.Parts[0].Text;
            }
            else
            {
                throw new Exception("Error communicating with Gemini API.");
            }
        }
    }
}

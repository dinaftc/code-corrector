import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToastStore } from './toast'
import router from '@/router' // Import your Vue Router instance

export const usePredictionStore = defineStore('prediction', () => {
  const codeToPredict = ref('')
  const lineNumber = ref(null)
  const InstructionType= ref(null)
  const testCasesInput = ref('') // Store raw input from Codemirror
  const wronginstruction = ref('')
  const PredictedResults = ref(null)
  const useToast = useToastStore()
const loading=ref(false)
const erroring=ref(true)
  // Function to send POST request to backend
  const correctProgram = async () => {
    console.log('triggered');
    try {
        const classRegex = /class\s+\w+/;
        const staticMethodRegex = /static\s+\w+\s*\(/;
        const containsClass = classRegex.test(codeToPredict.value);
        const containsStaticMethod = staticMethodRegex.test(codeToPredict.value);
        const ErrorExpression = ref('No solution found within the time limit')
        if (!containsClass && !containsStaticMethod) {
            useToast.openToast(true, 'No class or method is defined', 'error');
            console.log('No class or method is defined');
            return;
        }

        if (codeToPredict.value && lineNumber.value !== null && testCasesInput.value) {
            let parsedTestCases;

            try {
                parsedTestCases = JSON.parse(testCasesInput.value);
            } catch (parseError) {
                console.error('Invalid JSON format in test cases input:', parseError);
                return;
            }

            const requestBody = {
                program: codeToPredict.value,
                test_cases: parsedTestCases,
                line_number: lineNumber.value,
                wrong_expression: wronginstruction.value
            };

            console.log('Request Body:', requestBody);

            loading.value = true;

            let response;
            if (InstructionType.value === 'Affectation') {
                response = await fetch('http://localhost:8081/test_program', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
            } else {
                response = await fetch('http://localhost:8082/test_program', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
            }

            if (response.ok) {
                const result = await response.json();
                console.log('Prediction result:', result);
                loading.value = false;
                PredictedResults.value = result;
                if (PredictedResults.value.best_expression==""){
                  PredictedResults.value.new_program='No solution found within the time limit'
                  erroring.value=false
                }
                router.push('/predictedResults');
            } else {
                console.error('Failed to get prediction:', response.status, response.statusText);
                const errorText = await response.text();
                console.error('Error response text:', errorText);
                useToast.openToast(true, `Failed to get prediction: ${response.status} - ${response.statusText}`, 'error');
            }
        } else {
            useToast.openToast(true, 'Please make sure all required data is filled and respect the syntax required', 'error');
            console.error('Incomplete data provided for prediction');
        }
    } catch (error) {
        console.error('Error correcting program:', error);
        useToast.openToast(true, 'Please check syntax and requirements, Error correcting program', 'error');
    }
};


  return { codeToPredict, lineNumber, testCasesInput, wronginstruction, PredictedResults, correctProgram,loading ,InstructionType,erroring}
})

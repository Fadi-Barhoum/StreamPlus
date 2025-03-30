<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use App\Entity\Payment;
use App\Entity\Address;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\ORM\EntityManagerInterface;

final class SubscriptionController extends AbstractController
{
    private $entityManager;
    private $validator;

    // Inject dependencies into the constructor
    public function __construct(EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
    }

    #[Route('/', name: 'app_subscription')]
    public function index(): Response
    {
        return $this->render('subscription/index.html.twig', [
            'controller_name' => 'SubscriptionController',
        ]);
    }

    #[Route('/api/subscribe', name: 'api_subscribe', methods: ['POST'])]
    public function subscribe(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Extract user data
        $name = $data['user']['name'];
        $email = $data['user']['email'];
        $phone = $data['user']['phone'];
        $subscriptionType = $data['user']['subscriptionType'];
        $addressData = $data['user']['address'];

        // Check if the email already exists
        $existingUser = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);

        if ($existingUser) {
            return new JsonResponse(['success' => false, 'message' => 'Email already exists.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Create User and Address entities
        $user = new User();
        $user->setName($name);
        $user->setEmail($email);
        $user->setPhone($phone);
        $user->setSubscriptionType($subscriptionType);

        $address = new Address();
        $address->setAddressLine1($addressData['addressLine1']);
        $address->setCity($addressData['city']);
        $address->setPostalCode($addressData['postalCode']);
        $address->setState($addressData['state']);
        $address->setCountry($addressData['country']);
        $address->setUser($user); // Associate address with user

        // Validate the user and address entities
        $errors = $this->validator->validate($user);
        $addressErrors = $this->validator->validate($address);

        if (count($errors) > 0 || count($addressErrors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            foreach ($addressErrors as $addressError) {
                $errorMessages[] = $addressError->getMessage();
            }
            return new JsonResponse(['success' => false, 'message' => implode(', ', $errorMessages)], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Persist User and Address entities
        $this->entityManager->persist($user);
        $this->entityManager->persist($address);

        // Handle payment data if provided
        if ($subscriptionType === 'Premium' && isset($data['payment'])) {
            $paymentData = $data['payment'];

            $payment = new Payment();
            $payment->setCardNumber($paymentData['cardNumber']);
            $payment->setExpirationDate($paymentData['expirationDate']);
            $payment->setCvv($paymentData['cvv']);
            $payment->setUser($user); // Associate payment with user

            // Validate the payment entity
            $paymentErrors = $this->validator->validate($payment);
            if (count($paymentErrors) > 0) {
                $paymentErrorMessages = [];
                foreach ($paymentErrors as $paymentError) {
                    $paymentErrorMessages[] = $paymentError->getMessage();
                }
                return new JsonResponse(['success' => false, 'message' => implode(', ', $paymentErrorMessages)], JsonResponse::HTTP_BAD_REQUEST);
            }

            // Set payment on the user (via setPayment)
            $user->setPayment($payment);

            $this->entityManager->persist($payment);
        }

        // Persist all data to the database
        $this->entityManager->flush();

        return new JsonResponse(['success' => true, 'message' => 'Subscription successful.']);
    }
}

<?php

namespace App\Entity;

use App\Repository\PaymentRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: PaymentRepository::class)]
class Payment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false, onDelete: "CASCADE")]
    private ?User $user = null;

    #[ORM\Column(type: 'string', length: 16)]
    #[Assert\NotBlank(message: "Credit card number is required.")]
    #[Assert\Length(min: 16, max: 16, exactMessage: "Credit card number must be 16 digits.")]
    #[Assert\Regex(pattern: "/^\d+$/", message: "Credit card number must contain only digits.")]
    private ?string $cardNumber = null;

    #[ORM\Column(type: 'string', length: 5)]
    #[Assert\NotBlank(message: "Expiration date is required.")]
    #[Assert\Regex(pattern: "/^(0[1-9]|1[0-2])\/[0-9]{2}$/", message: "Invalid expiration date format (MM/YY).")]
    private ?string $expirationDate = null;

    #[ORM\Column(type: 'string', length: 3)]
    #[Assert\NotBlank(message: "CVV is required.")]
    #[Assert\Length(min: 3, max: 3, exactMessage: "CVV must be exactly 3 digits.")]
    #[Assert\Regex(pattern: "/^\d+$/", message: "CVV must contain only digits.")]
    private ?string $cvv = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getCardNumber(): ?string
    {
        return $this->cardNumber;
    }

    public function setCardNumber(string $cardNumber): static
    {
        $this->cardNumber = $cardNumber;

        return $this;
    }

    public function getExpirationDate(): ?string
    {
        return $this->expirationDate;
    }

    public function setExpirationDate(string $expirationDate): static
    {
        $this->expirationDate = $expirationDate;

        return $this;
    }

    public function getCvv(): ?string
    {
        return $this->cvv;
    }

    public function setCvv(string $cvv): static
    {
        $this->cvv = $cvv;

        return $this;
    }
}
